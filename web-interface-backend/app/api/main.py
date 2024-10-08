import os
from dotenv import load_dotenv
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api import schemas, crud, models
from app.api.database import SessionLocal
from app.api.settings.cors import add_cors

load_dotenv('.env')


app = FastAPI()
app = add_cors(app)


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_user_progress(
    db: Session,
    model: models.RealismResponse
        | models.ConditionalityResponse
        | models.MAImagesResponse
    ,
    db_user: models.User,
) -> int:
    last_response = (
        db.query(model)
        .filter(model.user_id == db_user.id)
        .order_by(model.question_id.desc())
        .first()
    )
    progress = 0 if last_response is None else last_response.question_id
    return progress


def get_next_question(
    db: Session,
    model : models.RealismQuestion
        | models.ConditionalityQuestion
        | models.MAImagesQuestion
    ,
    progress: int,
):
    next_question_id = progress + 1
    next_question = (
        db.query(model)
        .filter(model.id == next_question_id)
        .first()
    )
    return next_question


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post('/login/')
async def login(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
) -> schemas.User:
    """Logs in a user. No password is required.
    
    If the user does not exists, it is created.

    """
    return crud.get_or_create_user(db, user=user)


@app.get('/users/')
async def get_users(
    db: Session = Depends(get_db),
) -> List[schemas.User]:
    """Get all users."""
    return crud.get_users(db)


@app.get('/images/{image_id}/')
async def get_image(
    image_id: str,
    db: Session = Depends(get_db),
) -> FileResponse:
    """Get an image."""
    image_obj = crud.get_image(db, image_id)
    if image_obj is None:
        raise HTTPException(status_code=404, detail="Image not found")

    base_path = os.getenv('REAL_IMAGES_DIR' if image_obj.is_real else 'FAKE_IMAGES_DIR')
    abs_path = os.path.join(base_path, image_obj.image_path)

    return FileResponse(abs_path, headers={'Cache-Control': 'no-cache'})


@app.get('/next_realism_question/')
async def get_next_realism_question(
    username: str,
    db: Session = Depends(get_db),
):
    """Asks for a new realism question."""
    # Count how many responses the user has.
    db_user = crud.get_or_create_user(db, user=schemas.UserCreate(username=username))
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    progress = get_user_progress(db, models.RealismResponse, db_user)
    next_question : models.RealismQuestion = get_next_question(
        db,
        models.RealismQuestion,
        progress,
    )

    if next_question is None:
        raise HTTPException(status_code=404, detail="No unanswered questions left")

    total = db.query(models.RealismQuestion).count()

    return {
        'question_id': next_question.id,
        'real_image_id': next_question.real_image_id,
        'fake_image_id': next_question.fake_image_id,
        'left_is_real': next_question.left_is_real,
        'progress': progress,
        'total': total,
    }


@app.post('/post_realism_answer/')
async def post_realism_answer(
    response: schemas.RealismResponseCreate,
    db: Session = Depends(get_db),
) -> schemas.RealismResponse:
    """Posts a response for the realism question."""
    return crud.create_realism_response(db=db, response=response)


@app.get('/next_conditionality_question/')
async def get_next_conditionality_question(
    username: str,
    db: Session = Depends(get_db),
):
    """Asks for a new conditionality question."""
    # Count how many responses the user has.
    db_user = crud.get_or_create_user(db, user=schemas.UserCreate(username=username))
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    progress = get_user_progress(db, models.ConditionalityResponse, db_user)
    next_question : models.ConditionalityQuestion = get_next_question(
        db,
        models.ConditionalityQuestion,
        progress,
    )

    if next_question is None:
        raise HTTPException(status_code=404, detail="No unanswered questions left")

    total = db.query(models.ConditionalityQuestion).count()

    return {
        'question_id': next_question.id,
        'image_id': next_question.image_id,
        'label': next_question.label,
        'class_name': next_question.class_name,
        'progress': progress,
        'total': total,
    }


@app.post('/post_conditionality_answer/')
async def post_conditionality_answer(
    response: schemas.ConditionalityResponseCreate,
    db: Session = Depends(get_db),
) -> schemas.ConditionalityResponse:
    """Posts a response for the conditionality question."""
    return crud.create_conditionality_response(db=db, response=response)


@app.get('/next_model_assessment_question/')
async def get_next_model_assessment_question(
    username: str,
    db: Session = Depends(get_db),
):
    """Asks for a new model assessment question.

    The next question can be one of these types:
    "ma_images_question", "ma_baseline_questionnaire",
    "ma_questionnaire" or "ma_nasa_tlx".

    """
    # Count how many responses the user has.
    db_user = crud.get_or_create_user(db, user=schemas.UserCreate(username=username))
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Get the progress as only the number of MAImagesResponses.
    images_questions_progress = get_user_progress(db, models.MAImagesResponse, db_user)
    total = db.query(models.MAImagesQuestion).count()

    next_question : models.ModelAssessmentQuestion = get_next_question(
        db,
        models.ModelAssessmentQuestion,
        db_user.model_assessment_progress,
    )

    if next_question is None:
        raise HTTPException(status_code=404, detail="No unanswered questions left")

    response = {
        'question_id': next_question.id,
        'question_type': next_question.question_type,
        'progress': images_questions_progress,
        'total': total,
    }

    if next_question.question_type == "ma_images_question":
        inner_question = (
            db.query(models.MAImagesQuestion)
            .filter(models.MAImagesQuestion.id == next_question.ma_images_question_id)
            .first()
        )
        response.update({
            'inner_question_id': inner_question.id,
            'pacient_image_id': inner_question.pacient_image_id,
            'factual_image_id': inner_question.factual_image_id,
            'counterfactual_image_id': inner_question.counterfactual_image_id,
            'class_name': inner_question.class_name,
            'explanation_type': inner_question.explanation_type,
        })
    # elif next_question.question_type == "ma_baseline_questionnaire":
    #     pass
    # elif next_question.question_type == "ma_questionnaire":
    #     pass
    # elif next_question.question_type == "ma_nasa_tlx":
    #     pass

    return response


@app.post('/post_ma_images_answer/')
async def post_ma_images_answer(
    response: schemas.MAImagesResponseCreate,
    db: Session = Depends(get_db),
) -> schemas.MAImagesResponse:
    """Posts a response for the model assessment images question."""
    return crud.create_ma_images_response(db=db, response=response)


@app.post('/post_ma_baseline_questionnaire_answer/')
async def post_ma_baseline_questionnaire_answer(
    response: schemas.MAQuestionnaireBaselineResponseCreate,
    db: Session = Depends(get_db),
) -> schemas.MAQuestionnaireBaselineResponse:
    """Posts a response for the model assessment baseline questionnaire."""
    return crud.create_ma_questionnaire_baseline_response(db=db, response=response)


@app.post('/post_ma_questionnaire_answer/')
async def post_ma_questionnaire_answer(
    response: schemas.MAQuestionnaireResponseCreate,
    db: Session = Depends(get_db),
) -> schemas.MAQuestionnaireResponse:
    """Posts a response for the model assessment questionnaire."""
    return crud.create_ma_questionnaire_response(db=db, response=response)


@app.post('/post_ma_questionnaire_baseline_answer/')
async def post_ma_questionnaire_baseline_answer(
    response: schemas.MAQuestionnaireBaselineResponseCreate,
    db: Session = Depends(get_db),
) -> schemas.MAQuestionnaireBaselineResponse:
    """Posts a response for the model assessment questionnaire baseline."""
    return crud.create_ma_questionnaire_baseline_response(db=db, response=response)


@app.post('/post_ma_nasa_tlx_answer/')
async def post_ma_nasa_tlx_answer(
    response: schemas.MANasaTLXResponseCreate,
    db: Session = Depends(get_db),
) -> schemas.MANasaTLXResponse:
    """Posts a response for the model assessment nasa tlx."""
    return crud.create_ma_nasa_tlx_response(db=db, response=response)
