import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';

interface Props {
    handleClick: (value: number) => void;
};

const ReasonAlternativesForm: React.FC<Props> = ({ handleClick }) => {
    return (
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
            ¿Cuál fue el principal aspecto que te permitió identificar la imagen sintética?
        </FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="-1"
            name="radio-buttons-group"
        >
            <FormControlLabel onClick={ () => handleClick(1) } value="1" control={<Radio />} labelPlacement="bottom" label="Partes blandas" />
            <FormControlLabel onClick={ () => handleClick(2) } value="2" control={<Radio />} labelPlacement="bottom" label="Estructura ósea" />
            <FormControlLabel onClick={ () => handleClick(3) } value="3" control={<Radio />} labelPlacement="bottom" label="Dispositivos externos" />
            <FormControlLabel onClick={ () => handleClick(4) } value="4" control={<Radio />} labelPlacement="bottom" label="Artefactos de la imagen" />
            <FormControlLabel onClick={ () => handleClick(0) } value="0" control={<Radio />} labelPlacement="bottom" label="Otro" />
        </RadioGroup>
        </FormControl>
    );
};

export default ReasonAlternativesForm;
