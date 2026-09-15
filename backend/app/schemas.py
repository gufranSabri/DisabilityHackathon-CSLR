from pydantic import BaseModel
from typing import List


class Sign2TextRequest(BaseModel):
    frames: List[str]


class Sign2TextResponse(BaseModel):
    gloss_tokens: List[str]
    text: str


class Text2SignRequest(BaseModel):
    text: str


class Text2SignResponse(BaseModel):
    matched: bool
    id: str | None = None
    gloss_tokens: List[str]
    # Real 86-point keypoint sequence for this sample, if pose data was found:
    # frames of [ [x,y] x 86 ] (0:21 right hand, 21:42 left hand, 42:61 lips, 61:86 body).
    pose: List[List[List[float]]] | None = None
