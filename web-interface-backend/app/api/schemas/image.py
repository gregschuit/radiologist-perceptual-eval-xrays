from pydantic import BaseModel


class Image(BaseModel):

    id: int
    image_path: str

    class Config:
        orm_mode = True
