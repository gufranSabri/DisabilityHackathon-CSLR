import pickle
from pathlib import Path

POSE_PKL_PATH = (
    Path("/Users/gufran/Developer/Projects/Misc/disability_cslr/models/Pose86K-CSLR-Isharah")
    / "data"
    / "pose_data_isharah2000_hands_lips_body_phase2_SI.pkl"
)


class PoseLookup:
    """Loads the real 86-point pose keypoint sequences (hands, lips, body) keyed by
    sample id, matching the same ids used by the text2sign gloss CSV lookup."""

    def __init__(self):
        self.pose_dict = {}
        if POSE_PKL_PATH.exists():
            with open(POSE_PKL_PATH, "rb") as f:
                self.pose_dict = pickle.load(f)
            print(f"Loaded {len(self.pose_dict)} pose sequences from {POSE_PKL_PATH.name}")
        else:
            print(f"Warning: pose data not found at {POSE_PKL_PATH}, sign avatar playback disabled")

    def get_pose(self, sample_id: str) -> list | None:
        """Return keypoints as a JSON-serializable list of frames: [[[x,y], ...86...], ...T...]
        or None if the id has no pose data."""
        entry = self.pose_dict.get(sample_id)
        if entry is None:
            return None
        keypoints = entry["keypoints"]
        return keypoints.tolist()
