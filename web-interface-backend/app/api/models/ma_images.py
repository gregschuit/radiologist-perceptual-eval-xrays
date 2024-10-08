from datetime import datetime

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.api.database import Base


class MAImagesQuestion(Base):

    __tablename__ = "ma_images_questions"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    responses = relationship("MAImagesResponse", back_populates="question")

    pacient_image_id = Column(Integer, ForeignKey("images.id"))
    pacient_image = relationship(
        "Image",
        foreign_keys='MAImagesQuestion.pacient_image_id',
        back_populates="ma_images_questions_as_pacient",
    )

    factual_image_id = Column(Integer, ForeignKey("images.id"))
    factual_image = relationship(
        "Image",
        foreign_keys='MAImagesQuestion.factual_image_id',
        back_populates="ma_images_questions_as_factual",
    )

    counterfactual_image_id = Column(Integer, ForeignKey("images.id"))
    counterfactual_image = relationship(
        "Image",
        foreign_keys='MAImagesQuestion.counterfactual_image_id',
        back_populates="ma_images_questions_as_counterfactual",
    )

    class_name = Column(String)
    is_correct = Column(Boolean)
    explanation_type = Column(String)

    model_assessment_questions = relationship(
        "ModelAssessmentQuestion",
        foreign_keys="ModelAssessmentQuestion.ma_images_question_id",
        back_populates="ma_images_question",
    )


class MAImagesResponse(Base):

    __tablename__ = "ma_images_responses"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    model_correctness_response = Column(Integer)
    model_correctness_reason = Column(String)
    explanation_helpfulness_response = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="ma_images_responses")

    question_id = Column(Integer, ForeignKey("ma_images_questions.id"))
    question = relationship("MAImagesQuestion", back_populates="responses")
