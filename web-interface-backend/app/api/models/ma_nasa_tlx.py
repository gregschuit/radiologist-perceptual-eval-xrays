from datetime import datetime

from sqlalchemy import Column, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship

from app.api.database import Base


class MANasaTLXResponse(Base):

    __tablename__ = "ma_nasa_tlx_responses"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    mental_demand = Column(Integer)
    physical_demand = Column(Integer)
    temporal_demand = Column(Integer)
    performance = Column(Integer)
    effort = Column(Integer)
    frustration = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="ma_nasa_tlx_responses")

    model_assessment_question_id = Column(Integer, ForeignKey("model_assessment_questions.id"))
    model_assessment_question = relationship(
        "ModelAssessmentQuestion",
        back_populates="ma_nasa_tlx_responses",
    )
