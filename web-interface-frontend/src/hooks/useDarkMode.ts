import { useState } from 'react';

interface IUseDarkMode {
    setDarkMode: (userDarkMode: boolean) => void;
    darkMode: boolean | null;
}

export default function useDarkMode(): IUseDarkMode {
    const getDarkMode = () => {
        const darkModeString = sessionStorage.getItem('darkMode');
        const darkMode = darkModeString ? JSON.parse(darkModeString) : true;
        return darkMode;
    };

    const [darkMode, setDarkMode] = useState(getDarkMode());

    const saveDarkMode = (userDarkMode: boolean) => {
        sessionStorage.setItem('darkMode', JSON.stringify(userDarkMode));
        setDarkMode(userDarkMode);
    };

    return {
        setDarkMode: saveDarkMode,
        darkMode
    };
}
