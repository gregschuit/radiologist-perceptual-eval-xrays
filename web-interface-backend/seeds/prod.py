from dotenv import load_dotenv

load_dotenv('.env')


from app.api.models import (
    ConditionalityQuestion,
    ConditionalityResponse,
    Image,
    User,
    RealismQuestion,
    RealismResponse,
)
from app.api.database import engine, SessionLocal

User.__table__.create(bind=engine, checkfirst=True)
Image.__table__.create(bind=engine, checkfirst=True)
ConditionalityQuestion.__table__.create(bind=engine, checkfirst=True)
RealismQuestion.__table__.create(bind=engine, checkfirst=True)
ConditionalityResponse.__table__.create(bind=engine, checkfirst=True)
RealismResponse.__table__.create(bind=engine, checkfirst=True)

# Create an user
db = SessionLocal()
user = User(username="testuser")
db.add(user)
db.commit()
db.refresh(user)

print("Created user with id", user.id)
