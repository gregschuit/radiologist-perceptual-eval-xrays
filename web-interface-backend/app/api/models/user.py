from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.api.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    model_assessment_progress = Column(Integer, default=0)

    realism_responses = relationship("RealismResponse", back_populates="user")
    conditionality_responses = relationship(
        "ConditionalityResponse", back_populates="user"
    )
    ma_images_responses = relationship(
        "MAImagesResponse", back_populates="user"
    )
    ma_questionnaire_responses = relationship(
        "MAQuestionnaireResponse", back_populates="user"
    )
    ma_questionnaire_baseline_responses = relationship(
        "MAQuestionnaireBaselineResponse", back_populates="user"
    )
    ma_nasa_tlx_responses = relationship(
        "MANasaTLXResponse", back_populates="user",
    )
