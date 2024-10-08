import { useState } from 'react';

interface IUseZoomed {
    setZoomed: (userZoomed: boolean) => void;
    zoomed: boolean | null;
}

export default function useZoomed(): IUseZoomed {
    const getZoomed = () => {
        const zoomedString = sessionStorage.getItem('zoomed');
        const zoomed = zoomedString ? JSON.parse(zoomedString) : true;
        return zoomed;
    };

    const [zoomed, setZoomed] = useState(getZoomed());

    const saveZoomed = (userZoomed: boolean) => {
        sessionStorage.setItem('zoomed', JSON.stringify(userZoomed));
        setZoomed(userZoomed);
    };

    return {
        setZoomed: saveZoomed,
        zoomed
    };
}
