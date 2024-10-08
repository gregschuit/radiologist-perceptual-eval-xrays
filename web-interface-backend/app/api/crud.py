from typing import List

from sqlalchemy.orm import Session

from app.api import models, schemas


def create_user(db: Session, user: schemas.UserCreate) -> schemas.User:
    obj = models.User(username=user.username)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session) -> List[schemas.User]:
    return db.query(models.User).all()


def get_or_create_user(db: Session, user: schemas.UserCreate) -> schemas.User:
    """Get user by username. If it does not exist, create it."""
    obj = db.query(models.User).filter(models.User.username == user.username).first()
    if obj is None:
        obj = create_user(db, user=user)
    return obj


def get_image(db: Session, image_id: int) -> schemas.Image:
    """Get an image."""
    return db.query(models.Image).filter(models.Image.id == image_id).first()


def create_realism_response(
    db: Session,
    response: schemas.RealismResponseCreate,
) -> models.RealismResponse:
    """Create a realism response with username."""
    user_obj = get_or_create_user(db, user=response)
    obj = models.RealismResponse(
        user_id=user_obj.id,
        question_id=response.question_id,
        response=response.response,
        reason=response.reason,
        specific_reason=response.specific_reason,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def create_conditionality_response(
    db: Session,
    response: schemas.ConditionalityResponseCreate,
) -> models.ConditionalityResponse:
    """Create a conditionality response with username."""
    user_obj = get_or_create_user(db, user=response)
    obj = models.ConditionalityResponse(
        user_id=user_obj.id,
        question_id=response.question_id,
        response=response.response,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def create_ma_images_response(
    db: Session,
    response: schemas.MAImagesResponseCreate,
) -> models.MAImagesResponse:
    """Create a model assessment images response with username."""
    user_obj = get_or_create_user(db, user=response)
    user_obj.model_assessment_progress += 1
    obj = models.MAImagesResponse(
        user_id=user_obj.id,
        question_id=response.question_id,
        model_correctness_response=response.model_correctness_response,
        model_correctness_reason=response.model_correctness_reason,
        explanation_helpfulness_response=response.explanation_helpfulness_response,
    )
    db.add(user_obj)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def create_ma_questionnaire_response(
    db: Session,
    response: schemas.MAQuestionnaireResponseCreate,
) -> models.MAQuestionnaireResponse:
    """Create a model assessment questionnare response with username."""
    user_obj = get_or_create_user(db, user=response)
    user_obj.model_assessment_progress += 1
    obj = models.MAQuestionnaireResponse(
        user_id=user_obj.id,
        model_assessment_question_id=response.model_assessment_question_id,
        understanding_response=response.understanding_response,
        alignment_response=response.alignment_response,
        trust_response=response.trust_response,
        perceived_competence_response=response.perceived_competence_response,
        necessity_response=response.necessity_response,
    )
    db.add(user_obj)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def create_ma_questionnaire_baseline_response(
    db: Session,
    response: schemas.MAQuestionnaireBaselineResponseCreate,
) -> models.MAQuestionnaireBaselineResponse:
    """Create a model assessment questionnare baseline response with username."""
    user_obj = get_or_create_user(db, user=response)
    user_obj.model_assessment_progress += 1
    obj = models.MAQuestionnaireBaselineResponse(
        user_id=user_obj.id,
        model_assessment_question_id=response.model_assessment_question_id,
        understanding_response=response.understanding_response,
        trust_response=response.trust_response,
        perceived_competence_response=response.perceived_competence_response,
    )
    db.add(user_obj)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def create_ma_nasa_tlx_response(
    db: Session,
    response: schemas.MANasaTLXResponseCreate,
) -> models.MANasaTLXResponse:
    """Create a model assessment nasa tlx response with username."""
    user_obj = get_or_create_user(db, user=response)
    user_obj.model_assessment_progress += 1
    obj = models.MANasaTLXResponse(
        user_id=user_obj.id,
        model_assessment_question_id=response.model_assessment_question_id,
        mental_demand=response.mental_demand,
        physical_demand=response.physical_demand,
        temporal_demand=response.temporal_demand,
        performance=response.performance,
        effort=response.effort,
        frustration=response.frustration,
    )
    db.add(user_obj)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj
