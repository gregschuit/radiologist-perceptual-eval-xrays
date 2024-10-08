import React from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

interface Props {
    zoomed: boolean;
    setZoomed: (zoomed: boolean) => void;
};

const ZoomSwitch: React.FC<Props> = ({ zoomed, setZoomed }) => {
    return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="zoom" onClick={() => setZoomed(!zoomed)} >
                { zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
            </IconButton>
        </Stack>
    );
};

export default ZoomSwitch;
