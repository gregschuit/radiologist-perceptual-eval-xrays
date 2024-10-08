import React, { useState  } from 'react';
import { Link } from 'react-router-dom';

import Image from 'src/components/Image';
import ScaleResponse from 'src/components/ScaleResponse';
import Progress from 'src/components/Progress';

import { Button } from '@mui/material';

import LINKS from 'src/links';

import './../style.css';
import useUsername from 'src/hooks/useUsername';
import ROUTES from 'src/backend/routes';
import FinishedMessage from 'src/components/FinishedMessage';
import LoadingSpinner from 'src/components/LoadingSpinner';

interface Props {
    zoomed: boolean;
};

const Conditionality: React.FC<Props> = ({ zoomed }) => {

    const { username } = useUsername();

    const [imageId, setImageId] = useState(-1);
    const [className, setClassName] = useState('');

    const [questionId, setQuestionId] = useState(-1);
    const [progress, setProgress] = useState(-1);
    const [total, setTotal] = useState(-1);

    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const [selectedResponse, setSelectedResponse] = useState(0);

    const getNextConditionalityQuestion = () => {
        setLoading(true);
        fetch(ROUTES.GET_NEXT_CONDITIONALITY_QUESTION + '?username=' + username, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok && response.status === 404) {
                throw new Error('No more questions');
            } else {
                return response.json()
            }
        })
        .then(data => {
            setImageId(data.image_id);
            setClassName(data.class_name);
            setTotal(data.total);
            setProgress(data.progress);
            setQuestionId(data.question_id);
            setLoading(false);
        })
        .catch((error) => {
            if (error.message === 'No more questions') {
                setFinished(true);
            } else {
                console.error('Error:', error);
            };
        });
    };

    const handleScaleResponseClick = (response: number) => {
        setSelectedResponse(response);
    };

    const handleSubmit = () => {
        setLoading(true);
        fetch(ROUTES.POST_CONDITIONALITY_ANSWER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                question_id: questionId,
                response: selectedResponse,
            })
        }).then(() => {
            getNextConditionalityQuestion();
            setLoading(false);
        });
    };

    // Get next question on first render
    if (!loading && imageId === -1) {
        getNextConditionalityQuestion();
    };

    const scale_options = [
        {
            number: -2,
            text: 'Definitivamente no',
            onClick: () => handleScaleResponseClick(-2),
            marked: selectedResponse === -2,
        },
        {
            number: -1,
            text: 'Probablemente no',
            onClick: () => handleScaleResponseClick(-1),
            marked: selectedResponse === -1,
        },
        {
            number: 0,
            text: 'Indeterminado',
            onClick: () => handleScaleResponseClick(0),
            marked: selectedResponse === 0,
        },
        {
            number: 1,
            text: 'Probablemente sí',
            onClick: () => handleScaleResponseClick(1),
            marked: selectedResponse === 1,
        },
        {
            number: 2,
            text: 'Definitivamente sí',
            onClick: () => handleScaleResponseClick(2),
            marked: selectedResponse === 2,
        }
    ];

    let content;
    if (finished) {
        content = <FinishedMessage />;
    } else if (loading) {
        content = <LoadingSpinner />;
    } else {
        content = (
            <>
                <h2>¿Está el siguiente hallazgo presente en la imagen?</h2>
                <h3>{ className }</h3>
                <div className="images-container">
                    <Image image_id={ imageId } zoomed={ zoomed } />
                </div>
                <div className='task-form'>
                    <div className='task-form-part'>
                        <ScaleResponse options={ scale_options }/>
                    </div>
                    <div className='task-form-part'>
                        <div className='task-form-submit-button-container'>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={ handleSubmit }
                            >
                                Enviar
                            </Button>
                        </div>
                    </div>
                    <div className='task-form-part'>
                        <Progress number={ progress } total={ total } />
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="image-browser">
                { content }
                <div className='button-goback-container'>
                    <Link to={ LINKS.ROOT }>
                        <Button className="button-goback" variant="outlined">
                            Volver al menú
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Conditionality;
