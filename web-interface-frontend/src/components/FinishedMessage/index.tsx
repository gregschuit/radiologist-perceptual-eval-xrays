import React from "react";
import MyConfetti from "src/components/Confetti";


const FinishedMessage: React.FC = () => {
    return (
        <div className="image-browser">
            <h4>Has llegado al final.</h4>
            <h2>¡Muchas gracias por participar!</h2>
            <MyConfetti />
        </div>
    );
};

export default FinishedMessage;
