import React from 'react';
import Slider from '@mui/material/Slider';


interface Props {
    value: number;
    setValue: (number: number) => void;
}

const ContrastSlider: React.FC<Props> = ({ value, setValue }) => {
    return (
        <>
            <Slider
                size="small"
                defaultValue={ value }
                min={ 50 }
                max={ 200 }
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={ (e: any) => setValue(e.target.value) }
            />
        </>
    );
};

export default ContrastSlider;
