from pydantic import BaseModel


class UserCreate(BaseModel):

    username: str


class User(UserCreate):

    id: int
    model_assessment_progress: int

    class Config:
        orm_mode = True
