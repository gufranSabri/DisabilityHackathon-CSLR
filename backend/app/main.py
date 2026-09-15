import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import Sign2TextRequest, Sign2TextResponse, Text2SignRequest, Text2SignResponse
from app.sign2text.pose_extractor import MediaPipeExtractor
from app.sign2text.preprocess import SkeletonPreprocessor
from app.sign2text.model_loader import ModelLoader
from app.text2sign.lookup import TextToSignLookup
from app.text2sign.pose_lookup import PoseLookup

app = FastAPI(title="SignWorld Backend", version="1.0")

# CORS for Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5300", "http://127.0.0.1:5300",
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:3000", "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and lookup at startup
pose_extractor = MediaPipeExtractor()
preprocessor = SkeletonPreprocessor()
model_loader = ModelLoader()
text_lookup = TextToSignLookup()
pose_lookup = PoseLookup()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/sign2text", response_model=Sign2TextResponse)
def sign2text(request: Sign2TextRequest):
    """
    Extract skeleton keypoints from video frames, preprocess, and run sign recognition.
    """
    keypoints_list = []

    for base64_frame in request.frames:
        kpts = pose_extractor.extract_from_base64(base64_frame)
        if kpts is not None:
            keypoints_list.append(kpts)

    if not keypoints_list:
        return Sign2TextResponse(gloss_tokens=[], text="")

    # Preprocess sequence
    preprocessed = preprocessor.preprocess_sequence(keypoints_list)

    # Run inference
    model_loader.load_model()  # Ensure loaded
    gloss_tokens = model_loader.infer(preprocessed["x"], preprocessed["len_x"])

    # Join gloss tokens into text
    text = " ".join(gloss_tokens)

    return Sign2TextResponse(gloss_tokens=gloss_tokens, text=text)


@app.post("/api/text2sign", response_model=Text2SignResponse)
def text2sign(request: Text2SignRequest):
    """
    Look up exact Arabic gloss string in Isharah dataset.
    """
    matched, vid_id, gloss_tokens = text_lookup.lookup_text(request.text)

    pose = pose_lookup.get_pose(vid_id) if matched and vid_id else None

    return Text2SignResponse(matched=matched, id=vid_id or None, gloss_tokens=gloss_tokens, pose=pose)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
