import React, { useState } from "react";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TutorialModal from "src/components/TutorialModal";

import ROUTES from "src/backend/routes";

import "./style.css";

interface Props {
    setUsername: (token: string) => void;
}

interface User {
    username: string;
}

const Login: React.FC<Props> = ({ setUsername }) => {
    const [formUsername, setFormUserName] = useState<string>('');
    const [usernames, setUsernames] = useState<Array<string>>([]);

    const [openModal, setOpenModal] = useState<boolean>(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(formUsername);
    }

    const fetchUsernames = async () => {
        return fetch(ROUTES.GET_USERS, { method: 'GET' })
        .then(response => response.json())
        .then(data => data.map((user: User) => user.username))
        .catch((error) => console.error('Error:', error));
    };

    if (usernames.length === 0) {
        fetchUsernames().then(fetchedUsernames => setUsernames(fetchedUsernames));
    };

    return (
        <>
            <div className="login-container">
                <TutorialModal
                    openModal={ openModal }
                    handleClose={ handleCloseModal }
                />
                <h1>Selecciona tu nombre de usuario</h1>
                <div className="login-form-container">
                    <form onSubmit={ handleSubmit }>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            {
                                usernames.map(username => (
                                    <FormControlLabel
                                        key={ username }
                                        onClick={ () => setFormUserName(username) }
                                        value={ username }
                                        control={ <Radio /> }
                                        label={ username } />
                                ))
                            }
                        </RadioGroup>
                        <div className="login-form-field-container">
                            <Button type="submit" variant="contained">
                                Entrar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
