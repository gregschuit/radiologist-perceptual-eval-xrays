import React, { useState  } from 'react';
import { Link } from 'react-router-dom';

import Image from 'src/components/Image';
import ScaleResponse from 'src/components/ScaleResponse';
import Progress from 'src/components/Progress';

import { Button, TextField } from '@mui/material';
import useUsername from 'src/hooks/useUsername';

import LoadingSpinner from 'src/components/LoadingSpinner';
import FinishedMessage from 'src/components/FinishedMessage';

import LINKS from 'src/links';
import './../style.css';
import ROUTES from 'src/backend/routes';
import ReasonAlternativesForm from 'src/components/ReasonAlternativesForm';


interface Props {
    zoomed: boolean;
};

const Realism: React.FC<Props> = ({ zoomed }) => {

    const { username } = useUsername();

    // States for retrieved variables to be display.
    const [leftImageId, setLeftImageId] = useState(-1);
    const [rightImageId, setRightImageId] = useState(-1);
    const [questionId, setQuestionId] = useState(-1);
    const [progress, setProgress] = useState(-1);
    const [total, setTotal] = useState(-1);

    // States for answer submission.
    const [selectedReason, setSelectedReason] = useState(-1);
    const [selectedResponse, setSelectedResponse] = useState(0);
    const [specificReason, setSpecificReason] = useState('');

    // States for information loading.
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const getNextRealismQuestion = () => {
        setLoading(true);
        fetch(ROUTES.GET_NEXT_REALISM_QUESTION + '?username=' + username, {
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
            if (data.left_is_real) {
                setLeftImageId(data.real_image_id);
                setRightImageId(data.fake_image_id);
            } else {
                setLeftImageId(data.fake_image_id);
                setRightImageId(data.real_image_id);
            };
            setTotal(data.total);
            setProgress(data.progress);
            setQuestionId(data.question_id);
            setLoading(false);
        })
        .catch((error) => {
            if (error.message === 'No more questions') {
                setFinished(true);
                return;
            } else {
                console.error('Error:', error);
            };
        });
    };

    const resetSelections = () => {
        setSelectedReason(-1);
        setSelectedResponse(0);
        setSpecificReason('');
    };

    const handleScaleResponseClick = (response: number) => {
        setSelectedResponse(response);
        if (response === 0) {
            resetSelections();
        };
    };

    const handleReasonClick = (reason: number) => {
        setSelectedReason(reason);
        if (reason !== 0) {
            setSpecificReason('');
        };
    };

    const handleChangeSpecificReason = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpecificReason(event.target.value.trim());
    };

    const canSubmit = () => {
        if (selectedResponse === 0) {
            return true;  // No reason needed.
        } else if (selectedReason === -1) {
            return false;  // Reason needed but not selected.
        } else if (selectedReason === 0 && specificReason === '') {
            return false;  // Reason needs specification.
        } else {
            return true;  // All good.
        };
    };

    const handleSubmit = () => {
        if (!canSubmit()) {
            return;
        };

        setLoading(true);
        fetch(ROUTES.POST_REALISM_ANSWER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                question_id: questionId,
                response: selectedResponse,
                reason: selectedReason,
                specific_reason: specificReason,
            })
        }).then(() => {
            getNextRealismQuestion();
            resetSelections();
            setLoading(false);
        });
    };

    // Get next question on first render
    if (!loading && leftImageId === -1) {
        getNextRealismQuestion();
    };

    const scale_options = [
        {
            number: -2,
            text: 'Definitivamente la izquierda',
            onClick: () => handleScaleResponseClick(-2),
            marked: (selectedResponse === -2),
        },
        {
            number: -1,
            text: 'Probablemente la izquierda',
            onClick: () => handleScaleResponseClick(-1),
            marked: (selectedResponse === -1),
        },
        {
            number: 0,
            text: 'No lo puedo determinar',
            onClick: () => handleScaleResponseClick(0),
            marked: (selectedResponse === 0),
        },
        {
            number: 1,
            text: 'Probablemente la derecha',
            onClick: () => handleScaleResponseClick(1),
            marked: (selectedResponse === 1),
        },
        {
            number: 2,
            text: 'Definitivamente la derecha',
            onClick: () => handleScaleResponseClick(2),
            marked: (selectedResponse === 2),
        }
    ];

    const needsReason = selectedResponse !== 0;
    const reasonAlternatives = (
        <div className='task-form-part'>
            <ReasonAlternativesForm handleClick={ handleReasonClick }/>
        </div>
    );
    const needsFreeReason = selectedReason === 0;
    const specificReasonAlternatives = (
        <div className='task-form-part'>
            <TextField onChange={ handleChangeSpecificReason } label="Especifica cuál" variant="standard" />
        </div>
    );

    let content;
    if (finished) {
        content = <FinishedMessage />;
    } else if (loading) {
        content = <LoadingSpinner />;
    } else {
        content = (
            <>
                <h2>¿Cuál es la imagen sintética?</h2>
                <div className="images-container">
                    <Image image_id={ leftImageId } zoomed={ zoomed } />
                    <Image image_id={ rightImageId } zoomed={ zoomed } />
                </div>
                <div className='task-form'>
                    <div className='task-form-part'>
                        <ScaleResponse options={ scale_options }/>
                    </div>
                    <div className='task-form-part'>
                        { needsReason ? reasonAlternatives : null }
                        { needsFreeReason ? specificReasonAlternatives : null }
                    </div>
                    <div className='task-form-part'>
                        <div className='task-form-submit-button-container'>
                            <Button
                                disabled={ !canSubmit() }
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

export default Realism;
