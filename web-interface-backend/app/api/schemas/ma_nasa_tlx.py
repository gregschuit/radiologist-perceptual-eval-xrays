from pydantic import BaseModel


class MANasaTLXResponseBase(BaseModel):

    model_assessment_question_id: int
    mental_demand : int
    physical_demand : int
    temporal_demand : int
    performance : int
    effort : int
    frustration : int


class MANasaTLXResponseCreate(MANasaTLXResponseBase):

    username: str


class MANasaTLXResponse(MANasaTLXResponseBase):

    id: int
    user_id: int

    class Config:
        orm_mode = True
