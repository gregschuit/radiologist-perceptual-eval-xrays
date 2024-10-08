import React from "react";
import LINKS from 'src/links';

import './style.css';

import TaskCard from 'src/components/TaskCard';

const Root: React.FC = () => {
    return (
        <>
            <div className="nav-menu-container">
                <h1>Experimentos</h1>
                <div className="nav-menu">
                    <div className="nav-menu-item">
                        <TaskCard
                            taskLink={ LINKS.TASK1 }
                            imageLink={ LINKS.IMG_TASK1_DEMO }
                            title={ "Tarea 1" }
                            description={ "Compara pares de imágenes e identifica cuál es la generada por IA." }
                        />
                    </div>
                    <div className="nav-menu-item">
                        <TaskCard
                            taskLink={ LINKS.TASK2 }
                            imageLink={ LINKS.IMG_TASK2_DEMO }
                            title={ "Tarea 2" }
                            description={ "Evalúa la presencia de una anomalía en cada imagen." }
                        />
                    </div>
                    <div className="nav-menu-item">
                        <TaskCard
                            taskLink={ LINKS.TASK3 }
                            imageLink={ LINKS.IMG_TASK3_DEMO }
                            title={ "Tarea 3" }
                            description={ "Evalúa la capacidad de un clasificador con ayuda de factuales y contrafactuales." }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Root;