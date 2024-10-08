from dotenv import load_dotenv

load_dotenv('.env')


from app.api.models import (
    ConditionalityQuestion,
    ConditionalityResponse,
    Image,
    User,
    RealismQuestion,
    RealismResponse,
    ModelAssessmentQuestion,
    MAImagesQuestion,
    MAImagesResponse,
    MAQuestionnaireBaselineResponse,
    MAQuestionnaireResponse,
    MANasaTLXResponse,
)
from app.api.database import engine, SessionLocal

User.__table__.create(bind=engine, checkfirst=True)
Image.__table__.create(bind=engine, checkfirst=True)
ConditionalityQuestion.__table__.create(bind=engine, checkfirst=True)
RealismQuestion.__table__.create(bind=engine, checkfirst=True)
ConditionalityResponse.__table__.create(bind=engine, checkfirst=True)
RealismResponse.__table__.create(bind=engine, checkfirst=True)

MAImagesQuestion.__table__.create(bind=engine, checkfirst=True)
MAImagesResponse.__table__.create(bind=engine, checkfirst=True)
ModelAssessmentQuestion.__table__.create(bind=engine, checkfirst=True)
MAQuestionnaireResponse.__table__.create(bind=engine, checkfirst=True)
MAQuestionnaireBaselineResponse.__table__.create(bind=engine, checkfirst=True)
MANasaTLXResponse.__table__.create(bind=engine, checkfirst=True)


# Create an user
db = SessionLocal()
user = User(username="guest@uc.cl")
db.add(user)
db.commit()
db.refresh(user)

print("Created user with id", user.id)

# Create an user
db = SessionLocal()
user = User(username="dparras@uc.cl")
db.add(user)
db.commit()
db.refresh(user)

print("Created user with id", user.id)

# Create an user
db = SessionLocal()
user = User(username="cbesa@uc.cl")
db.add(user)
db.commit()
db.refresh(user)

print("Created user with id", user.id)

images = [
    {
        "image_path": "p10/p10000032/s50414267/02aa804e-bde0afdd-112c0b34-7bc16630-4e384014.jpg",
        "is_real": True,
    },
    {
        "image_path": "p10/p10001176/s54684191/ed9c0dfc-ea25b576-0f8cc069-df4cdf14-0cd60eb7.jpg",
        "is_real": True,
    },
    {
        "image_path": "p10/p10008179/s53817986/d8d89fae-d828b540-932a2cde-971fb69b-1817ee7d.jpg",
        "is_real": True,
    },
    {
        "image_path": "c_stylegan2_imagenome_enlarged_cardiac/1/000000.png",
        "is_real": False,
    },
    {
        "image_path": "c_stylegan2_imagenome_enlarged_cardiac/1/000001.png",
        "is_real": False,
    },
    {
        "image_path": "c_stylegan2_imagenome_enlarged_cardiac/1/000002.png",
        "is_real": False,
    },
    {
        "image_path": "c_stylegan2_imagenome_enlarged_cardiac/1/000003.png",
        "is_real": False,
    },
    {
        "image_path": "c_stylegan2_imagenome_enlarged_cardiac/1/000004.png",
        "is_real": False,
    },
    {
        "image_path": "c_stylegan2_imagenome_enlarged_cardiac/1/000005.png",
        "is_real": False,
    },
    {
        "image_path": "c_stylegan2_imagenome_enlarged_cardiac/1/000006.png",
        "is_real": False,
    },
]

for image in images:
    img = Image(**image)
    db.add(img)
    db.commit()
    db.refresh(img)
    print("Created image with id", img.id)


# Create conditionality questions
conditionality_questions = [
    {
        "image_id": 4,
        "label": 1,
        "class_name": "Enlarged Cardiac Silhouette",
    },
    {
        "image_id": 5,
        "label": 1,
        "class_name": "Enlarged Cardiac Silhouette",
    },
    {
        "image_id": 6,
        "label": 1,
        "class_name": "Enlarged Cardiac Silhouette",
    }
]

for question in conditionality_questions:
    cond_q = ConditionalityQuestion(**question)
    db.add(cond_q)
    db.commit()
    db.refresh(cond_q)
    print("Created conditionality question with id", cond_q.id)


# Create realism questions
realism_questions = [
    {
        "real_image_id": 1,
        "fake_image_id": 7,
        "left_is_real": False,
    },
    {
        "real_image_id": 8,
        "fake_image_id": 2,
        "left_is_real": True,
    },
    {
        "real_image_id": 3,
        "fake_image_id": 9,
        "left_is_real": False,
    },
]

for question in realism_questions:
    real_q = RealismQuestion(**question)
    db.add(real_q)
    db.commit()
    db.refresh(real_q)
    print("Created realism question with id", real_q.id)


# Create model assessment images questions
ma_images_questions = [
    {
        "pacient_image_id": 1,
        "class_name": "Enlarged Cardiac Silhouette",
        "factual_image_id": None,
        "counterfactual_image_id": None,
        "explanation_type": "no_explanation",
        "is_correct": True,
    },
    {
        "pacient_image_id": 2,
        "class_name": "Pleural Effusion",
        "factual_image_id": None,
        "counterfactual_image_id": None,
        "explanation_type": "no_explanation",
        "is_correct": True,
    },
    {
        "pacient_image_id": 3,
        "class_name": "Pleural Effusion",
        "factual_image_id": 4,
        "counterfactual_image_id": None,
        "explanation_type": "factual",
        "is_correct": False,
    },
    {
        "pacient_image_id": 4,
        "class_name": "Atelectasis",
        "factual_image_id": None,
        "counterfactual_image_id": 5,
        "explanation_type": "counterfactual",
        "is_correct": True,
    },
    {
        "pacient_image_id": 5,
        "class_name": "Lung Opacity",
        "factual_image_id": 6,
        "counterfactual_image_id": 7,
        "explanation_type": "both",
        "is_correct": False,
    },
]

for question in ma_images_questions:
    real_q = MAImagesQuestion(**question)
    db.add(real_q)
    db.commit()
    db.refresh(real_q)
    print("Created model assessment images question with id", real_q.id)


# Create mode assessment questions
model_assessment_questions = [
    {
        "question_type": "ma_images_question",
        "ma_images_question_id": 1,
    },
    {
        "question_type": "ma_images_question",
        "ma_images_question_id": 2,
    },
    {
        "question_type": "ma_baseline_questionnaire",
    },
    {
        "question_type": "ma_images_question",
        "ma_images_question_id": 3,
    },
    {
        "question_type": "ma_images_question",
        "ma_images_question_id": 4,
    },
    {
        "question_type": "ma_questionnaire",
    },
    {
        "question_type": "ma_nasa_tlx",
    },
    {
        "question_type": "ma_images_question",
        "ma_images_question_id": 5,
    },
]

for question in model_assessment_questions:
    real_q = ModelAssessmentQuestion(**question)
    db.add(real_q)
    db.commit()
    db.refresh(real_q)
    print("Created model assessment question with id", real_q.id)


db.close()
