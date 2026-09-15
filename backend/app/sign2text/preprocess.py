import numpy as np
import torch


class SkeletonPreprocessor:
    """
    Preprocess skeleton keypoint sequences to match MSLR_ICCV2025 SkeletonFeeder.
    86-point skeleton (hand21x2, mouth19, body25), normalized, motion features, padding.
    """

    def __init__(self):
        # MSLR config from Double_Cosign_si.yaml
        self.split = [25, 46, 67, 86]  # body(25) | hand21 | hand21 | mouth(19)
        self.norm_point = [0, 25, 46, 67]  # Boundaries for per-part normalization
        self.norm_div = (10240 - 1) / 2  # Derived from skeleton resolution scaling

    def preprocess_sequence(self, keypoints_list: list[np.ndarray]) -> dict:
        """
        Convert sequence of 86-point frames into normalized, motion-enabled tensor.
        keypoints_list: list of (86, 2) arrays
        Returns dict with 'x' (B=1, C=7, T, 86) and 'len_x' (batch length in frames)
        """
        if not keypoints_list:
            raise ValueError("Empty keypoint sequence")

        keypoints_array = np.array(keypoints_list, dtype=np.float32)  # (T, 86, 2)
        T = len(keypoints_list)

        # Compute per-part normalization (center + scale)
        normalized = self._normalize_frames(keypoints_array)  # (T, 86, 2)

        # Extract features: xy (2 channels) + forward-diff (2) + backward-diff (2) + confidence (1)
        x = self._build_feature_tensor(normalized)  # (T, 86, 7)

        # Pad to multiple of 4 + edge repeat (6 left + right)
        x_padded = self._pad_sequence(x)  # (T_padded, 86, 7)

        # Model's CoSign2s.forward expects (N, T, V, C) - channels last, it slices
        # x[:,:,:,2:6] etc. directly and only permutes to N,C,T,V after the linear
        # projection - so no channel-first permute here, just add the batch dim.
        x_tensor = torch.from_numpy(x_padded).float().unsqueeze(0)  # (1, T_padded, 86, 7)

        return {"x": x_tensor, "len_x": torch.tensor([T], dtype=torch.long)}

    def _normalize_frames(self, keypoints: np.ndarray) -> np.ndarray:
        """Normalize per body part (body25, hand21, hand21, mouth19)."""
        result = np.zeros_like(keypoints, dtype=np.float32)

        for i in range(len(self.split)):
            start = self.norm_point[i]
            end = self.split[i]
            part = keypoints[:, start:end, :]  # (T, part_size, 2)

            # Center per part: subtract mean
            part_mean = np.nanmean(part, axis=(0, 1), keepdims=True)
            centered = part - part_mean

            # Scale per part: divide by norm_div
            normalized = centered / self.norm_div

            result[:, start:end, :] = normalized

        return result

    def _build_feature_tensor(self, normalized_kpts: np.ndarray) -> np.ndarray:
        """
        Build 7-channel feature tensor: xy (2) + forward-diff (2) + backward-diff (2) + confidence (1).
        normalized_kpts: (T, 86, 2)
        Returns: (T, 86, 7)
        """
        T, num_joints, _ = normalized_kpts.shape
        features = np.zeros((T, num_joints, 7), dtype=np.float32)

        features[:, :, 0:2] = normalized_kpts  # xy

        # Forward difference (t - t-1)
        features[1:, :, 2:4] = normalized_kpts[1:, :, :] - normalized_kpts[:-1, :, :]
        features[0, :, 2:4] = features[1, :, 2:4]  # Edge repeat

        # Backward difference (t+1 - t)
        features[:-1, :, 4:6] = normalized_kpts[1:, :, :] - normalized_kpts[:-1, :, :]
        features[-1, :, 4:6] = features[-2, :, 4:6]  # Edge repeat

        # Confidence (1.0 if nonzero xy, 0 if zero padding)
        confidence = np.where(
            (normalized_kpts[:, :, 0] != 0) | (normalized_kpts[:, :, 1] != 0), 1.0, 0.0
        )
        features[:, :, 6] = confidence

        return features

    def _pad_sequence(self, x: np.ndarray) -> np.ndarray:
        """
        Left-pad 6 frames (edge repeat) + right-pad to multiple of 4 (+6).
        x: (T, 86, 7)
        Returns: (T_padded, 86, 7)
        """
        T = x.shape[0]

        # Left pad: repeat first frame 6 times
        left_pad = np.tile(x[0:1, :, :], (6, 1, 1))

        # Right pad to multiple of 4 + 6
        target_length = ((T + 5) // 4) * 4 + 6
        right_pad_size = target_length - (T + 6)
        right_pad = np.tile(x[-1:, :, :], (right_pad_size + 6, 1, 1))

        padded = np.vstack([left_pad, x, right_pad])
        return padded[:target_length]  # Ensure exact length
