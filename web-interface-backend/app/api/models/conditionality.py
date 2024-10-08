from datetime import datetime

from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.api.database import Base


class ConditionalityQuestion(Base):

    __tablename__ = "conditionality_questions"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    label = Column(Integer)
    class_name = Column(String)

    responses = relationship("ConditionalityResponse", back_populates="question")

    image_id = Column(Integer, ForeignKey("images.id"))
    image = relationship("Image", back_populates="conditionality_questions")


class ConditionalityResponse(Base):

    __tablename__ = "conditionality_responses"

    id = Column(Integer, primary_key=True, index=True)
    response = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="conditionality_responses")

    question_id = Column(Integer, ForeignKey("conditionality_questions.id"))
    question = relationship("ConditionalityQuestion", back_populates="responses")
