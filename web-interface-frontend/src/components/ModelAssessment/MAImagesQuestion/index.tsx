import React, { Dispatch, SetStateAction, ChangeEvent, useState } from 'react';

import { Button, TextField } from '@mui/material';
import ContrastSlider from 'src/components/ContrastSlider';

import LikertScale from 'src/components/LikertScale';
import Image from 'src/components/Image';

import './style.css';


interface Props {
    zoomed: boolean;
    pacientImageId: number;
    pacientImageClassName: string;
    factualImageId: number;
    counterfactualImageId: number;
    modelCorrectnessResponse: number;
    setModelCorrectnessResponse: Dispatch<SetStateAction<number>>;
    modelCorrectnessReason: string;
    setModelCorrectnessReason: Dispatch<SetStateAction<string>>;
    explanationHelpfulnessResponse: number;
    setExplanationHelpfulnessResponse: Dispatch<SetStateAction<number>>;
    handleImagesQuestionSubmit: () => void;
};

const MAImagesQuestion: React.FC<Props> = ({
    zoomed,
    pacientImageId,
    pacientImageClassName,
    factualImageId,
    counterfactualImageId,
    modelCorrectnessResponse,
    setModelCorrectnessResponse,
    modelCorrectnessReason,
    setModelCorrectnessReason,
    explanationHelpfulnessResponse,
    setExplanationHelpfulnessResponse,
    handleImagesQuestionSubmit,
}) => {
    const [pacientContrast, setPacientContrast] = useState(100);
    const [factualContrast, setFactualContrast] = useState(100);
    const [counterfactualContrast, setCounterfactualContrast] = useState(100);

    const handleChangeSpecificReason = (e: ChangeEvent<HTMLInputElement>) => {
        setModelCorrectnessReason(e.target.value);
    };
    const definitely_no_to_yes_scale_texts = [
        'Definitivamente no',
        'Probablemente no',
        'No lo puedo determinar',
        'Probablemente sí',
        'Definitivamente sí',
    ];
    const agreement_scale_texts = [
        'Muy en desacuerdo',
        'En desacuerdo',
        'Neutral',
        'De acuerdo',
        'Muy de acuerdo',
    ];
    const labelPlacement = 'end';
    const rowOrientation = false;

    const showFactual = (factualImageId !== null);
    const showCounterfactual = (counterfactualImageId !== null);
    const showExplanation = (showFactual || showCounterfactual);

    const factualExplanation = <>
        <div className='model-assessment-image-slider-and-caption'>
            <div className="model-assessment-image-and-slider">
                <Image
                    image_id={ factualImageId }
                    zoomed={ zoomed }
                    contrast={ factualContrast }
                />
                <ContrastSlider
                    value={ factualContrast }
                    setValue={ setFactualContrast }
                />
            </div>
            <p>
                Según la IA así se ve una imagen <strong>con</strong> la anomalía.
            </p>
        </div>
    </>;
    const counterfactualExplanation = <>
        <div className='model-assessment-image-slider-and-caption'>
            <div className="model-assessment-image-and-slider">
                <Image
                    image_id={ counterfactualImageId }
                    zoomed={ zoomed }
                    contrast={ counterfactualContrast}
                />
                <ContrastSlider
                    value={ counterfactualContrast }
                    setValue={ setCounterfactualContrast }
                />
            </div>
            <p>
                Según la IA así se ve una imagen <strong>sin</strong> la anomalía.
            </p>
        </div>
    </>;
    const explanation = <>
        <div className="vertical-line" />
        <div className='model-assessment-explanations-subsection'>
            <div className='model-assessment-explanation-header'>
                <h4>
                    Explicación:
                </h4>
            </div>
            <div className="model-assessment-explanation-images">
                { showFactual ? factualExplanation : null }
                { showCounterfactual ? counterfactualExplanation : null }
            </div>
        </div>
    </>;

    const explanationQuestion = (
        <div className="model-assessment-images-question-item">
            <p>
                La explicación de referencia me ayuda a identificar si la IA predice este caso correctamente.
            </p>
            <LikertScale
                texts={ agreement_scale_texts }
                onOptionClick={ setExplanationHelpfulnessResponse }
                selectedResponse={ explanationHelpfulnessResponse }
                labelPlacement={ labelPlacement }
                rowOrientation={ rowOrientation }
            />
        </div>
    );

    return <>
        <div className="model-assessment-images-questions-container">
            <div className="model-assessment-images-section">
                <div className='model-assessment-pacient-subsection'>
                    <div className='model-assessment-pacient-header'>
                        <h4>Radiografía del paciente a evaluar:</h4>
                    </div>
                    <div className='model-assessment-image-slider-and-caption'>
                        <div className='model-assessment-image-and-slider'>
                            <Image
                                image_id={ pacientImageId }
                                zoomed={ zoomed }
                                contrast={ pacientContrast }
                            />
                            <ContrastSlider
                                value={ pacientContrast }
                                setValue={ setPacientContrast }
                            />
                        </div>
                        <p>
                            La imagen fue clasificada por la IA como <strong>
                                { pacientImageClassName }
                            </strong>.
                        </p>
                    </div>
                </div>
                { showExplanation ? explanation : null }
            </div>
            <hr />
            <div className="model-assessment-images-questions-section">
                <div className="model-assessment-images-question-item">
                    <p>
                        ¿Es correcta la predicción de la IA?
                    </p>
                    <LikertScale
                        texts={ definitely_no_to_yes_scale_texts }
                        onOptionClick={ setModelCorrectnessResponse }
                        selectedResponse={ modelCorrectnessResponse }
                        labelPlacement={ labelPlacement }
                        rowOrientation={ rowOrientation }
                    />
                </div>
                <div className="model-assessment-images-question-item">
                    <p>
                        ¿Qué hallazgo en la imagen te permitió responder la pregunta anterior?
                    </p>
                    <div className='model-assessment-text-field-container'>
                        <TextField
                            fullWidth
                            onChange={ handleChangeSpecificReason }
                            label="Especifica cuál"
                            variant="standard"
                        >
                            { modelCorrectnessReason }
                        </TextField>
                    </div>
                </div>
                { showExplanation ? explanationQuestion : null}
                <div className="model-assessment-images-question-item">
                    <div className='model-assessment-images-question-submit-container'>
                        <Button
                                disabled={ modelCorrectnessReason.trim().length === 0}
                                variant="contained"
                                color="primary"
                                onClick={ handleImagesQuestionSubmit }
                            >
                                Siguiente
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default MAImagesQuestion;
