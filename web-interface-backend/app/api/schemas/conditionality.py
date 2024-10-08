from pydantic import BaseModel


class ConditionalityResponseBase(BaseModel):

    question_id: int
    response: int


class ConditionalityResponseCreate(ConditionalityResponseBase):

    username: str


class ConditionalityResponse(ConditionalityResponseBase):

    id: int
    user_id: int

    class Config:
        orm_mode = True
