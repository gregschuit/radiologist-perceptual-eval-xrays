from pydantic import BaseModel


class RealismResponseBase(BaseModel):

    question_id: int
    response: int
    reason: int
    specific_reason: str


class RealismResponseCreate(RealismResponseBase):

    username: str


class RealismResponse(RealismResponseBase):

    id: int
    user_id: int

    class Config:
        orm_mode = True
