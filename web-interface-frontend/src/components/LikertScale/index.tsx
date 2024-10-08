import React from 'react';

import ScaleResponse from 'src/components/ScaleResponse';

interface Props {
    texts: string[];
    onOptionClick: (number: number) => void;
    selectedResponse: number;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    rowOrientation?: boolean;
};

const LikertScale: React.FC<Props> = ({
    texts,
    onOptionClick,
    selectedResponse,
    labelPlacement,
    rowOrientation,
}) => {
    // texts: is the list of texts to display in
    // the likert scale. It should have 5 items.
    const numbers = [-2, -1, 0, 1, 2];
    const options = numbers.map((number, idx) => {
        return {
            number,
            text: texts[idx],
            onClick: () => onOptionClick(number),
            marked: (selectedResponse === number),
        };
    })
    return (
        <>
            <ScaleResponse
                options={ options }
                labelPlacement={ labelPlacement }
                rowOrientation={ rowOrientation }
            />
        </>
    );
};

export default LikertScale;
