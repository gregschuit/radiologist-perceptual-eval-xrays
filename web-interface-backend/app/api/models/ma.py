from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.api.database import Base


class ModelAssessmentQuestion(Base):

    __tablename__ = "model_assessment_questions"

    id = Column(Integer, primary_key=True, index=True)

    # One of {"ma_images_question", "ma_baseline_questionnare", "ma_questionnaire", "nasa_tlx"}
    question_type = Column(String)

    # If question_type == "ma_images_question", then this id is used.
    ma_images_question_id = Column(
        Integer,
        ForeignKey("ma_images_questions.id"),
        nullable=True,
    )
    ma_images_question = relationship(
        "MAImagesQuestion",
        back_populates="model_assessment_questions",
    )

    ma_questionnaire_responses = relationship(
        "MAQuestionnaireResponse", back_populates="model_assessment_question",
    )

    ma_questionnaire_baseline_responses = relationship(
        "MAQuestionnaireBaselineResponse", back_populates="model_assessment_question",
    )

    ma_nasa_tlx_responses = relationship(
        "MANasaTLXResponse", back_populates="model_assessment_question",
    )
