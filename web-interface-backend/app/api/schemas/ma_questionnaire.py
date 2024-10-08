from pydantic import BaseModel


class MAQuestionnaireResponseBase(BaseModel):

    model_assessment_question_id: int
    understanding_response: int
    trust_response: int
    perceived_competence_response: int
    alignment_response: int
    necessity_response: int


class MAQuestionnaireResponseCreate(MAQuestionnaireResponseBase):

    username: str


class MAQuestionnaireResponse(MAQuestionnaireResponseBase):

    id: int
    user_id: int

    class Config:
        orm_mode = True



# Model Assessment Questionnaire

class MAQuestionnaireBaselineResponseBase(BaseModel):

    model_assessment_question_id: int
    understanding_response: int
    trust_response: int
    perceived_competence_response: int


class MAQuestionnaireBaselineResponseCreate(
    MAQuestionnaireBaselineResponseBase
):

    username: str


class MAQuestionnaireBaselineResponse(MAQuestionnaireBaselineResponseBase):

    id: int
    user_id: int

    class Config:
        orm_mode = True
