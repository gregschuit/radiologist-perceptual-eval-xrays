import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@mui/material';
import NasaTLXItem from 'src/components/ModelAssessment/MANasaTLX/NasaTLXItem';

import './style.css';

interface Props {
    mentalDemand: number;
    setMentalDemand: Dispatch<SetStateAction<number>>;
    physicalDemand: number;
    setPhysicalDemand: Dispatch<SetStateAction<number>>;
    temporalDemand: number;
    setTemporalDemand: Dispatch<SetStateAction<number>>;
    performance: number;
    setPerformance: Dispatch<SetStateAction<number>>;
    effort: number;
    setEffort: Dispatch<SetStateAction<number>>;
    frustration: number;
    setFrustration: Dispatch<SetStateAction<number>>;
    onSubmit: () => void;
};

const MANasaTLX: React.FC<Props> = ({
    mentalDemand,
    setMentalDemand,
    physicalDemand,
    setPhysicalDemand,
    temporalDemand,
    setTemporalDemand,
    performance,
    setPerformance,
    effort,
    setEffort,
    frustration,
    setFrustration,
    onSubmit,
}) => {
    const items = [
        {
            title: 'Exigencia Mental',
            // question: 'How mentally demanding was this task?',
            question: '¿Qué tan exigente mentalmente fue esta tarea?',
            value: mentalDemand,
            setValue: setMentalDemand,
        },
        {
            title: 'Exigencia Física',
            // question: 'How physical demanding was this task?',
            question: '¿Qué tan exigente físicamente fue esta tarea?',
            value: physicalDemand,
            setValue: setPhysicalDemand,
        },
        {
            title: 'Exigencia Temporal',
            // question: 'How hurried or rushed was the pace of the task?',
            question: '¿Qué tan apresurado o precipitado fue el ritmo de la tarea?',
            value: temporalDemand,
            setValue: setTemporalDemand,
        },
        {
            title: 'Rendimiento',
            // question: 'How successful were you in accomplishing what you were asked to do?',
            question: '¿Que tan exitoso has sido para lograr lo que se te pidió?',
            value: performance,
            setValue: setPerformance,
        },
        {
            title: 'Esfuerzo',
            // question: 'How hard did you have to work to accomplish your level of performance?',
            question: '¿Cuánto has tenido que trabajar para alcanzar tu nivel de rendimiento?',
            value: effort,
            setValue: setEffort,
        },
        {
            title: 'Frustración',
            // question: 'How insecure, discouraged, irritated, stressed, and annoyed were you?',
            question: '¿En qué medida te sentías inseguro, desanimado, irritado, estresado y molesto durante la tarea?',
            value: frustration,
            setValue: setFrustration,
        },
    ];
    return <>
        <div className='nasa-tlx-container'>
            <div className="questionnaire-header">
                <h1>Cuestionario de exigencia</h1>
                <p>Has terminado una ronda de evaluación de imágenes.</p>
                <p>A continuación, completa los siguientes campos usando una escala entre "Muy bajo" y "Muy alto".</p>
            </div>
            {
                items.map((item, idx) => {
                    return (
                        <div key={ idx }>                            
                            <NasaTLXItem
                                title={ item.title }
                                question={ item.question }
                                value={ item.value }
                                setValue={ item.setValue }
                                />
                        </div>
                    )
                })
            }
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


export default MANasaTLX;
