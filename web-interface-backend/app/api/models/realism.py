from datetime import datetime

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.api.database import Base


class RealismQuestion(Base):

    __tablename__ = "realism_questions"

    id = Column(Integer, primary_key=True, index=True)
    left_is_real = Column(Boolean)
    created_at = Column(DateTime, default=datetime.utcnow)

    responses = relationship("RealismResponse", back_populates="question")

    fake_image_id = Column(Integer, ForeignKey("images.id"))
    fake_image = relationship(
        "Image",
        foreign_keys='RealismQuestion.fake_image_id',
        back_populates="realism_questions_as_fake",
    )

    real_image_id = Column(Integer, ForeignKey("images.id"))
    real_image = relationship(
        "Image",
        foreign_keys='RealismQuestion.real_image_id',
        back_populates="realism_questions_as_real",
    )


class RealismResponse(Base):

    __tablename__ = "realism_responses"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    response = Column(Integer)
    reason = Column(Integer)
    specific_reason = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="realism_responses")

    question_id = Column(Integer, ForeignKey("realism_questions.id"))
    question = relationship("RealismQuestion", back_populates="responses")
