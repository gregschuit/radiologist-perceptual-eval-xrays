import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import './style.css';

interface Props {
    title: string;
    question: string;
    value: number;
    setValue: (number: number) => void;
}

const NasaTLXItem: React.FC<Props> = ({
    title,
    question,
    value,
    setValue,
}) => {
    return <>
        <div className="nasa-tlx-item-container">
            <div className="nasa-tlx-item-header">
                <div className='nasa-tlx-item-header-title'>
                    <strong>
                        { title }
                    </strong>
                </div>
                <div className='nasa-tlx-item-header-question'>
                    { question }
                </div>
            </div>
            <div className="nasa-tlx-item-row">
                <Box sx={{ width: "100%" }}>
                    <Slider
                        track={ false }
                        aria-label="Small steps"
                        defaultValue={ 50 }
                        // getAriaValueText={ valuetext }
                        step={ 1 }
                        marks
                        min={ 0 }
                        max={ 100 }
                        // valueLabelDisplay="auto"
                        onChange={ (e: any) => setValue(e.target.value) }
                        value={ value }
                    />
                </Box>
            </div>
            <div className="nasa-tlx-item-labels">
                <div>
                    Muy bajo
                </div>
                <div>
                    Muy alto
                </div>
            </div>
        </div>
    </>
}

export default NasaTLXItem;
