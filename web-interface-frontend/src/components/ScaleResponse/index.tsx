import React from 'react';

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';


interface Option {
    number: number;
    text: string;
    onClick?: () => void;
    marked?: boolean;
};

interface Props {
    options: Option[];
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    rowOrientation?: boolean;
};

const ScaleResponse: React.FC<Props> = ({ options, labelPlacement, rowOrientation }) => {
    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" />
                <RadioGroup
                    row={ rowOrientation == null ? true : rowOrientation }
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="0"
                    name="radio-buttons-group"
                >
                    {
                        options.map( (option, index) => {
                            return (
                                <FormControlLabel
                                    key={ index }
                                    value={ option.number }
                                    control={ <Radio /> }
                                    label={ option.text }
                                    onClick={ option.onClick }
                                    labelPlacement={ labelPlacement || "bottom" }
                                />
                            );
                        })
                    }
                </RadioGroup>
            </FormControl>
        </>
    );
};

export default ScaleResponse;
