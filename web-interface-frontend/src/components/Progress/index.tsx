import React from "react";

import './style.css';

interface Props {
    number: number;
    total: number;
}

const Progress: React.FC<Props> = ({number, total}) => {

    return (
        <>
            <div className="counter">
                Avance: {number} / {total}
            </div>
        </>
    );
}

export default Progress;
