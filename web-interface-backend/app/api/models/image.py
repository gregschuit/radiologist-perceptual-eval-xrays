from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.api.database import Base


class Image(Base):

    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String)
    is_real = Column(Boolean)

    conditionality_questions = relationship(
        "ConditionalityQuestion",
        back_populates="image",
    )
    realism_questions_as_real = relationship(
        "RealismQuestion",
        back_populates="real_image",
        foreign_keys='RealismQuestion.real_image_id',
    )
    realism_questions_as_fake = relationship(
        "RealismQuestion",
        back_populates="fake_image",
        foreign_keys='RealismQuestion.fake_image_id',
    )
    ma_images_questions_as_pacient = relationship(
        "MAImagesQuestion",
        back_populates="pacient_image",
        foreign_keys='MAImagesQuestion.pacient_image_id',
    )
    ma_images_questions_as_factual = relationship(
        "MAImagesQuestion",
        back_populates="factual_image",
        foreign_keys='MAImagesQuestion.factual_image_id',
    )
    ma_images_questions_as_counterfactual = relationship(
        "MAImagesQuestion",
        back_populates="counterfactual_image",
        foreign_keys='MAImagesQuestion.counterfactual_image_id',
    )
