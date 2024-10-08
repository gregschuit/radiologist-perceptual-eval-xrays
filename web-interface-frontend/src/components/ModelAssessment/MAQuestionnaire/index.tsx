import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@mui/material';
import LikertScale from 'src/components/LikertScale';

import "./style.css";

interface Props {
    justShowBaselineQuestions: boolean;
    understanding: number;
    setUnderstanding: Dispatch<SetStateAction<number>>;
    alignment: number;
    setAlignment: Dispatch<SetStateAction<number>>;
    trust: number;
    setTrust: Dispatch<SetStateAction<number>>;
    perceivedModelCompetence: number;
    setPerceivedModelCompetence: Dispatch<SetStateAction<number>>;
    necessity: number;
    setNecessity: Dispatch<SetStateAction<number>>;
    onSubmit: () => void;
};

const MAQuestionnaire: React.FC<Props> = ({
    justShowBaselineQuestions,
    understanding,
    setUnderstanding,
    alignment,
    setAlignment,
    trust,
    setTrust,
    perceivedModelCompetence,
    setPerceivedModelCompetence,
    necessity,
    setNecessity,
    onSubmit,
}) => {
    const agreement_scale_texts = [
        'Muy en desacuerdo',
        'En desacuerdo',
        'Neutral',
        'De acuerdo',
        'Muy de acuerdo',
    ];
    const labelPlacement = 'bottom';
    const rowOrientation = true;

    const baselineQuestionsInfo = [
        {
            // text: 'I understand what the system bases its predictions on.',
            text: 'Entiendo en qué basa el sistema sus predicciones.',
            response: understanding,
            setResponse: setUnderstanding,
        },
        {
            // text: 'I am confident in the AI model. I feel that it works well.',
            text: 'Confío en el modelo de IA. Siento que funciona bien.',
            response: trust,
            setResponse: setTrust,
        },
        {
            // text: 'The use of this AI model would appropriate in a decision making scenario.',
            text: 'El uso de este modelo de IA sería apropiado en un escenario de toma de decisiones.',
            response: perceivedModelCompetence,
            setResponse: setPerceivedModelCompetence,
        },
    ];
    const baselineQuestions = <div>
        {
            baselineQuestionsInfo.map((info, idx) => {
                return <div key={ idx }>
                    <div className="questionnaire-item">
                        <div className='questionnaire-item-header'>
                            { info.text }
                        </div>
                        <LikertScale
                            texts={ agreement_scale_texts }
                            onOptionClick={ info.setResponse }
                            selectedResponse={ info.response }
                            labelPlacement={ labelPlacement }
                            rowOrientation={ rowOrientation }
                            />
                    </div>
                </div>
            })
        }
    </div>;

    const moreQuestionsInfo = [
        {
            //text: 'The explanation provides enough information to assess the model competence.',
            text: 'Las explicaciones proporcionan información suficiente para evaluar la competencia del modelo.',
            response: alignment,
            setResponse: setAlignment,
        },
        {
            //text: 'The information that the explanation provides is coherent with the model prediction.',
            text: 'La información que proporcionan las explicaciones es coherente con la predicción del modelo.',
            response: necessity,
            setResponse: setNecessity,
        },
    ];    
    const moreQuestions = <div>
        {
            moreQuestionsInfo.map((info, idx) => {
                return <div key={ idx }>
                    <div className="questionnaire-item">
                        <div className='questionnaire-item-header'>
                            { info.text }
                        </div>
                        <LikertScale
                            texts={ agreement_scale_texts }
                            onOptionClick={ info.setResponse }
                            selectedResponse={ info.response }
                            labelPlacement={ labelPlacement }
                            rowOrientation={ rowOrientation }
                            />
                    </div>
                </div>
            })
        }
    </div>;

    return <>
        <div className="questionnaire-container">
            <div className="questionnaire-header">
                <h1>Cuestionario de seguimiento</h1>
                <p>A continuación, indica qué tan de acuerdo estas con las siguientes afirmaciones.</p>
            </div>
            { baselineQuestions }
            { justShowBaselineQuestions ? null : moreQuestions }
            <Button
                variant="contained"
                color="primary"
                onClick={ onSubmit }
                >
                Enviar
            </Button>
        </div>
    </>
}


export default MAQuestionnaire;
