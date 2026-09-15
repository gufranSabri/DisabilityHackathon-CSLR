import os
from pathlib import Path

MODELS_DIR = Path("/Users/gufran/Developer/Projects/Misc/disability_cslr/models")
MSLR_DIR = MODELS_DIR / "MSLR_ICCV2025"
ISHARAH_DIR = MODELS_DIR / "Pose86K-CSLR-Isharah"

CHECKPOINT_PATH = MSLR_DIR / "cur_test_si_model.pt"
GLOSS_DICT_PATH = MSLR_DIR / "datasets" / "mslr2025" / "si_gloss_dict.json"
MODEL_CONFIG_PATH = MSLR_DIR / "configs" / "Double_Cosign_si.yaml"

ISHARAH_SI_TRAIN = ISHARAH_DIR / "annotations_v2" / "isharah2000" / "SI" / "train.csv"
ISHARAH_SI_DEV = ISHARAH_DIR / "annotations_v2" / "isharah2000" / "SI" / "dev.csv"
ISHARAH_SI_TEST = ISHARAH_DIR / "annotations_v2" / "isharah2000" / "SI" / "test.csv"
ISHARAH_US_TRAIN = ISHARAH_DIR / "annotations_v2" / "isharah2000" / "US" / "train.csv"
ISHARAH_US_DEV = ISHARAH_DIR / "annotations_v2" / "isharah2000" / "US" / "dev.csv"
ISHARAH_US_TEST = ISHARAH_DIR / "annotations_v2" / "isharah2000" / "US" / "test.csv"
