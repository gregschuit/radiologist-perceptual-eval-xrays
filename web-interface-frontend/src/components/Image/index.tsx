import React from 'react';
import './style.css';

import ROUTES from 'src/backend/routes';


interface Props {
    image_id: Number;
    zoomed: boolean;
    contrast?: number;
}

const Image: React.FC<Props> = ({ image_id, zoomed, contrast }) => {
    const url = new URL(image_id.toString(), ROUTES.IMAGES).href;
    return (
        <>
            <div className="image-container">
                <img
                    style={
                        {
                            filter: `contrast(${ contrast ? contrast : 100 }%)`
                        }
                    }
                    src={ url }
                    alt="image"
                    width={ zoomed ? 512 : 256 }
                    className={ zoomed ? 'zoomable-out' : 'zoomable-in' }
                />
            </div>
        </>
    );
};

export default Image;
