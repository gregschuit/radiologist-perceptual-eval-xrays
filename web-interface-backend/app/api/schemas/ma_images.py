from pydantic import BaseModel


class MAImagesResponseBase(BaseModel):

    question_id: int
    model_correctness_response: int
    model_correctness_reason: str
    explanation_helpfulness_response: int


class MAImagesResponseCreate(MAImagesResponseBase):

    username: str


class MAImagesResponse(MAImagesResponseBase):

    id: int
    user_id: int

    class Config:
        orm_mode = True
