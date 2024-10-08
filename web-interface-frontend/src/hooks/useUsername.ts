import { useState } from 'react';

import ROUTES from 'src/backend/routes';

interface IUseUsername {
    setUsername: (userUsername: string) => void;
    username: string | null;
}

export default function useUsername(): IUseUsername {

    const login = (username: string) => {
        // This request just creates the user if it not exists.
        fetch(ROUTES.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
    };

    const getUsername = () => {
        const usernameString = sessionStorage.getItem('username');
        const username = usernameString ? JSON.parse(usernameString) : null;
        return username;
    };

    const [username, setUsername] = useState(getUsername());

    const preprocessUsername = (username: string) => {
        return username.trim();
    }

    const saveUsername = (userUsername: string) => {
        userUsername = preprocessUsername(userUsername);
        login(userUsername);
        sessionStorage.setItem('username', JSON.stringify(userUsername));
        setUsername(userUsername);
    };

    return {
        setUsername: saveUsername,
        username
    };
}
