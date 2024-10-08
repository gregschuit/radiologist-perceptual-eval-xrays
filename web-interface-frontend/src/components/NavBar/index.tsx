import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import CustomizedSwitches from 'src/components/ThemeSwitch';
import ZoomSwitch from 'src/components/ZoomSwitch';
import TutorialModal from 'src/components/TutorialModal';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


import './style.css';

interface Props {
    username: string;
    toggleTheme: () => void;
    darkMode: boolean;
    zoomed: boolean;
    setZoomed: (zoomed: boolean) => void;
}

const NavBar: React.FC<Props> = ({
    username,
    toggleTheme,
    darkMode,
    zoomed,
    setZoomed,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 2, textAlign: "left" }}>
                        <b>{ username }</b>
                    </Typography>
                    <div className='navbar-right-button'>
                    <IconButton aria-label="zoom" onClick={ () => setOpenModal(true) } >
                        <HelpOutlineIcon />
                    </IconButton>
                    <TutorialModal
                        openModal={ openModal }
                        handleClose={ handleCloseModal }
                    />
                    </div>
                    <div className='navbar-right-button'>
                        <ZoomSwitch zoomed={ zoomed } setZoomed={ setZoomed } />                
                    </div>
                    <CustomizedSwitches toggleTheme={ toggleTheme } darkMode={ darkMode } />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
