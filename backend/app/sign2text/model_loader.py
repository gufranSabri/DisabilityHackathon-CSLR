import json
import sys
import torch
import yaml
from pathlib import Path

sys.path.insert(0, str(Path("/Users/gufran/Developer/Projects/Misc/disability_cslr/models/MSLR_ICCV2025")))

from slr_network import TwoStream_Cosign
from app.sign2text.decode import Decode
from app.config import CHECKPOINT_PATH, GLOSS_DICT_PATH, MODEL_CONFIG_PATH


class ModelLoader:
    """Load MSLR_ICCV2025 model once at startup, avoid per-request loading."""

    _instance = None
    _model = None
    _decoder = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def load_model(self):
        """Load model and checkpoint (singleton pattern)."""
        if self._model is not None:
            return self._model, self._decoder

        device = self._get_device()
        print(f"Loading model on device: {device}")

        # Load config
        with open(MODEL_CONFIG_PATH, "r") as f:
            config = yaml.safe_load(f)

        # Load gloss dict
        with open(GLOSS_DICT_PATH, "r") as f:
            gloss_dict = json.load(f)

        # Instantiate model (config is nested under model_args)
        num_classes = len(gloss_dict["id2gloss"]) + 1
        model_args = config.get("model_args", config)
        model = TwoStream_Cosign(
            visual_args=model_args["visual_args"],
            gloss_dict=gloss_dict,
            conv_type=model_args["conv_type"],
            loss_weights=model_args["loss_weights"],
        )

        # Load checkpoint. strict=False because CoSign2s registers each GCN block
        # under two attribute paths (e.g. both `static_layer1_1` and `static_layers.0`,
        # the latter via an auxiliary nn.ModuleList) so state_dict() has duplicate
        # aliases for the same parameters; the checkpoint only has the named-attribute
        # keys. Any *unexpected* (as opposed to missing) key would mean a real
        # mismatch, so that case is still treated as fatal below.
        checkpoint = torch.load(CHECKPOINT_PATH, map_location=device, weights_only=False)
        state_dict = checkpoint["model_state_dict"] if isinstance(checkpoint, dict) and "model_state_dict" in checkpoint else checkpoint
        # fusion_static/fusion_motion: unused ablation-variant weights present in the
        # checkpoint with no corresponding module in the current CoSign2s (only
        # fusion_fusion is used in forward()) - safe to drop.
        dead_prefixes = ("visual_module.fusion_static.", "visual_module.fusion_motion.")
        state_dict = {k: v for k, v in state_dict.items() if not k.startswith(dead_prefixes)}
        result = model.load_state_dict(state_dict, strict=False)
        if result.unexpected_keys:
            raise RuntimeError(f"Checkpoint has unexpected keys not present in model: {result.unexpected_keys}")
        missing_non_alias = [k for k in result.missing_keys if ".static_layers." not in k and ".motion_layers." not in k and ".fusion_layers." not in k]
        if missing_non_alias:
            raise RuntimeError(f"Checkpoint is missing required keys: {missing_non_alias}")

        model = model.to(device)
        model.eval()

        # Instantiate decoder (MaxDecode, no ctcdecode)
        decoder = Decode(gloss_dict, num_classes, search_mode="max", blank_id=0)

        self._model = model
        self._decoder = decoder

        print(f"Model loaded with {num_classes - 1} gloss tokens")
        return model, decoder

    @staticmethod
    def _get_device():
        """Detect best available device."""
        if torch.cuda.is_available():
            return torch.device("cuda")
        elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
            return torch.device("mps")
        else:
            return torch.device("cpu")

    def infer(self, x_tensor: torch.Tensor, len_x: torch.Tensor):
        """Run inference on preprocessed skeleton tensor."""
        model, decoder = self.load_model()

        with torch.no_grad():
            # Move to model device
            model_device = next(model.parameters()).device
            x_tensor = x_tensor.to(model_device)
            len_x = len_x.to(model_device)

            output = model({"x": x_tensor, "len_x": len_x})

        # Decode output
        recognized_sents = output.get("recognized_sents_fusion")
        if recognized_sents is None or len(recognized_sents) == 0:
            return []

        # Convert [(gloss_str, frame_idx), ...] to list of gloss strings
        gloss_list = [gloss for gloss, _ in recognized_sents[0]]
        return gloss_list
