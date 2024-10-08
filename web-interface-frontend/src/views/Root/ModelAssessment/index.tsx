import React, { useState  } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import Progress from 'src/components/Progress';
import LoadingSpinner from 'src/components/LoadingSpinner';
import FinishedMessage from 'src/components/FinishedMessage';

import MAImagesQuestion from 'src/components/ModelAssessment/MAImagesQuestion';
import MAQuestionnaire from 'src/components/ModelAssessment/MAQuestionnaire';
import MANasaTLX from 'src/components/ModelAssessment/MANasaTLX';

import useUsername from 'src/hooks/useUsername';

import LINKS from 'src/links';
import ROUTES from 'src/backend/routes';
import './style.css';

interface Props {
    zoomed: boolean;
};

const ModelAssessment: React.FC<Props> = ({ zoomed }) => {

    const { username } = useUsername();

    const [loading, setLoading] = useState(false);

    // Question properties
    const [modelAssessmentQuestionId, setModelAssessmentQuestionId] = useState(-1);
    const [questionType, setQuestionType] = useState('ma_images_question');

    // Images question properties
    const [imagesQuestionId, setImagesQuestionId] = useState(-1);
    const [pacientImageId, setPacientImageId] = useState(-1);
    const [pacientImageClassName, setPacientImageClassName] = useState('');
    const [factualImageId, setFactualImageId] = useState(-1);
    const [counterfactualImageId, setCounterfactualImageId] = useState(-1);
    const [progress, setProgress] = useState(0);
    const [total, setTotal] = useState(0);

    // Images question response properties
    const [modelCorrectnessResponse, setModelCorrectnessResponse] = useState(0);
    const [modelCorrectnessReason, setModelCorrectnessReason] = useState('');
    const [explanationHelpfulnessResponse, setExplanationHelpfulnessResponse] = useState(0);

    // Questionnaire response properties
    const [understanding, setUnderstanding] = useState(0);
    const [alignment, setAlignment] = useState(0);
    const [trust, setTrust] = useState(0);
    const [perceivedModelCompetence, setPerceivedModelCompetence] = useState(0);
    const [necessity, setNecessity] = useState(0);

    // NASA TLX response properties
    const [mentalDemand, setMentalDemand] = useState(50);
    const [physicalDemand, setPhysicalDemand] = useState(50);
    const [temporalDemand, setTemporalDemand] = useState(50);
    const [performance, setPerformance] = useState(50);
    const [effort, setEffort] = useState(50);
    const [frustration, setFrustration] = useState(50);

    const [finished, setFinished] = useState(false);

    // Call API for next question:
    const getNextModelAssessmentQuestion = () => {
        setLoading(true);
        fetch(ROUTES.GET_NEXT_MODEL_ASSESSMENT_QUESTION + '?username=' + username, {
             method: 'GET',
        })
        .then(response => {
            if (!response.ok && response.status === 404) {
                throw new Error('No more questions');
            } else {
                return response.json();
            };
        })
        .then(data => {
            if (data.question_type === 'ma_images_question') {
                setImagesQuestionId(data.inner_question_id);
                setPacientImageId(data.pacient_image_id);
                setPacientImageClassName(data.class_name);
                setFactualImageId(data.factual_image_id);
                setCounterfactualImageId(data.counterfactual_image_id);
            };
            setProgress(data.progress);
            setTotal(data.total);
            setModelAssessmentQuestionId(data.question_id);
            setQuestionType(data.question_type);
            setLoading(false);
        }).catch((error) => {
            if (error.message === 'No more questions') {
                setFinished(true);
                return;
            } else {
                console.error('Error:', error);
            };
        });
    };

    const handleImagesQuestionSubmit = () => {
        setLoading(true);
        fetch(ROUTES.POST_MA_IMAGES_QUESTION_ANSWER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                question_id: imagesQuestionId,
                model_correctness_response: modelCorrectnessResponse,
                model_correctness_reason: modelCorrectnessReason,
                explanation_helpfulness_response: explanationHelpfulnessResponse,
            })
        }).then(() => {
            getNextModelAssessmentQuestion();
            setLoading(false);
        });
    };

    const handleSubmitQuestionnaire = () => {
        setLoading(true);
        let endpoint;
        let body = {
            username,
            model_assessment_question_id: modelAssessmentQuestionId,
            understanding_response: understanding,
            trust_response: trust,
            perceived_competence_response: perceivedModelCompetence,
        };
        if (questionType === 'ma_baseline_questionnaire') {
            endpoint = ROUTES.POST_MA_QUESTIONNAIRE_BASELINE_ANSWER;
        } else {
            endpoint = ROUTES.POST_MA_QUESTIONNAIRE_ANSWER;
            body = Object.assign(body, {
                alignment_response: alignment,
                necessity_response: necessity,
            });
        };
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }).then(() => {
            getNextModelAssessmentQuestion();
            setLoading(false);
        });
    };

    const handleSubmitMANasaTLX = () => {
        setLoading(true);
        fetch(ROUTES.POST_MA_NASA_TLX_ANSWER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                model_assessment_question_id: modelAssessmentQuestionId,
                mental_demand: mentalDemand,
                physical_demand: physicalDemand,
                temporal_demand: temporalDemand,
                performance: performance,
                effort: effort,
                frustration: frustration, 
            }),
        }).then(() => {
            getNextModelAssessmentQuestion();
            setLoading(false);
        });
    };

    // Get next question on first render
    if (!loading && modelAssessmentQuestionId === -1) {
        getNextModelAssessmentQuestion();
    };

    let content;
    let showProgress = false;
    if (finished) {
        content = <FinishedMessage />;
    } else if (loading) {
        content = <LoadingSpinner />;
    } else if (
        questionType === 'ma_questionnaire'
        || questionType === 'ma_baseline_questionnaire'
    ) {
        content = (
            <MAQuestionnaire
                justShowBaselineQuestions={ questionType === 'ma_baseline_questionnaire' }
                understanding={ understanding }
                setUnderstanding={ setUnderstanding }
                alignment={ alignment }
                setAlignment={ setAlignment }
                trust={ trust }
                setTrust={ setTrust}
                perceivedModelCompetence={ perceivedModelCompetence }
                setPerceivedModelCompetence={ setPerceivedModelCompetence }
                necessity={ necessity }
                setNecessity={ setNecessity }
                onSubmit={ handleSubmitQuestionnaire }
            />
        );
    } else if (questionType === 'ma_nasa_tlx') {
        content = (
            <MANasaTLX
                mentalDemand={ mentalDemand }
                setMentalDemand={ setMentalDemand }
                physicalDemand={ physicalDemand }
                setPhysicalDemand={ setPhysicalDemand }
                temporalDemand={ temporalDemand }
                setTemporalDemand={ setTemporalDemand }
                performance={ performance }
                setPerformance={ setPerformance }
                effort={ effort }
                setEffort={ setEffort }
                frustration={ frustration }
                setFrustration={ setFrustration }
                onSubmit={ handleSubmitMANasaTLX }
            />
        );
    } else {
        showProgress = true;
        content = (
            <MAImagesQuestion
                zoomed={ zoomed }
                pacientImageId={ pacientImageId }
                pacientImageClassName={ pacientImageClassName }
                factualImageId={ factualImageId }
                counterfactualImageId={ counterfactualImageId }
                modelCorrectnessResponse={ modelCorrectnessResponse }
                setModelCorrectnessResponse={ setModelCorrectnessResponse }
                modelCorrectnessReason={ modelCorrectnessReason }
                setModelCorrectnessReason={ setModelCorrectnessReason }
                explanationHelpfulnessResponse={ explanationHelpfulnessResponse }
                setExplanationHelpfulnessResponse={ setExplanationHelpfulnessResponse }
                handleImagesQuestionSubmit={ handleImagesQuestionSubmit }
            />
        )
    };

    const progressComponents = <Progress number={ progress } total={ total } />;

    return (
        <>
            <div className='model-assessment-header'>
                <Link to={ LINKS.ROOT }>
                    <Button className="button-goback" variant="outlined">
                        Volver al menú
                    </Button>
                </Link>
                { showProgress ? progressComponents : null }
            </div>
            { content }
        </>
    );
}


export default ModelAssessment;
