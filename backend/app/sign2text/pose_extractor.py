import base64
from pathlib import Path

import cv2
import numpy as np
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.core.base_options import BaseOptions
from mediapipe import Image, ImageFormat

MODEL_PATH = Path(__file__).resolve().parents[2] / "models" / "holistic_landmarker.task"

# MediaPipe BlazePose gives 33 body landmarks; MSLR's "body25" expects 25.
# Drop the fine-grained face points (7,8 eyes/ears extras) and finger tips
# (17-22) that BlazePose adds beyond COCO's 17 + a few torso points, keeping
# a 25-point COCO-like subset in BlazePose's own index order.
POSE_25_INDICES = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    23, 24, 25, 26, 27, 28, 29, 30,
]

MOUTH_19_INDICES = [
    0, 13, 14, 17, 21, 37, 39, 40, 61, 62, 78, 80, 81, 82, 84, 87, 88, 95, 312,
]


class MediaPipeExtractor:
    """Extract 86-point skeleton keypoints from video frames using MediaPipe Tasks HolisticLandmarker."""

    def __init__(self):
        options = vision.HolisticLandmarkerOptions(
            base_options=BaseOptions(model_asset_path=str(MODEL_PATH)),
            running_mode=vision.RunningMode.IMAGE,
            min_face_detection_confidence=0.3,
            min_pose_detection_confidence=0.3,
            min_hand_landmarks_confidence=0.3,
        )
        self.landmarker = vision.HolisticLandmarker.create_from_options(options)

    def extract_from_base64(self, base64_frame: str) -> np.ndarray | None:
        """Extract 86-point skeleton from a base64-encoded JPEG frame (optionally a data: URI)."""
        try:
            if "," in base64_frame and base64_frame.strip().startswith("data:"):
                base64_frame = base64_frame.split(",", 1)[1]
            frame_data = base64.b64decode(base64_frame)
            frame = cv2.imdecode(np.frombuffer(frame_data, np.uint8), cv2.IMREAD_COLOR)
            if frame is None:
                return None
            return self._extract_keypoints(frame)
        except Exception:
            return None

    def _extract_keypoints(self, frame: np.ndarray) -> np.ndarray:
        """Run HolisticLandmarker on a single frame and return 86-point array (x, y only)."""
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = Image(image_format=ImageFormat.SRGB, data=rgb_frame)
        result = self.landmarker.detect(mp_image)

        keypoints = []

        # Left hand (21 landmarks)
        if result.left_hand_landmarks:
            for landmark in result.left_hand_landmarks:
                keypoints.append([landmark.x, landmark.y])
        else:
            keypoints.extend([[0, 0]] * 21)

        # Right hand (21 landmarks)
        if result.right_hand_landmarks:
            for landmark in result.right_hand_landmarks:
                keypoints.append([landmark.x, landmark.y])
        else:
            keypoints.extend([[0, 0]] * 21)

        # Body (25 of BlazePose's 33 landmarks)
        if result.pose_landmarks:
            pose = result.pose_landmarks
            for idx in POSE_25_INDICES:
                if idx < len(pose):
                    keypoints.append([pose[idx].x, pose[idx].y])
                else:
                    keypoints.append([0, 0])
        else:
            keypoints.extend([[0, 0]] * 25)

        # Mouth (19 of 478 face landmarks)
        if result.face_landmarks:
            face = result.face_landmarks
            for idx in MOUTH_19_INDICES:
                if idx < len(face):
                    keypoints.append([face[idx].x, face[idx].y])
                else:
                    keypoints.append([0, 0])
        else:
            keypoints.extend([[0, 0]] * 19)

        return np.array(keypoints, dtype=np.float32)
