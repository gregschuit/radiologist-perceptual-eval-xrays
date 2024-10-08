from datetime import datetime

from sqlalchemy import Column, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship

from app.api.database import Base


class MAQuestionnaireResponse(Base):

    __tablename__ = "ma_questionnaire_responses"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    understanding_response = Column(Integer)
    alignment_response = Column(Integer)
    trust_response = Column(Integer)
    perceived_competence_response = Column(Integer)
    necessity_response = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="ma_questionnaire_responses")

    model_assessment_question_id = Column(Integer, ForeignKey("model_assessment_questions.id"))
    model_assessment_question = relationship(
        "ModelAssessmentQuestion",
        back_populates="ma_questionnaire_responses",
    )


class MAQuestionnaireBaselineResponse(Base):

    __tablename__ = "ma_questionnaire_baseline_responses"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    understanding_response = Column(Integer)
    trust_response = Column(Integer)
    perceived_competence_response = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="ma_questionnaire_baseline_responses")

    model_assessment_question_id = Column(Integer, ForeignKey("model_assessment_questions.id"))
    model_assessment_question = relationship(
        "ModelAssessmentQuestion",
        back_populates="ma_questionnaire_baseline_responses",
    )
