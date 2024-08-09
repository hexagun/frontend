import React from 'react';

const Token = ({ position }) => {

    const tokenStyle = {
        scale: 0.8,
    };

    return (
        <mesh position={position} scale={[tokenStyle.scale, tokenStyle.scale, .08]}>
            <boxGeometry />
            <meshStandardMaterial color="red" transparent />
        </mesh>
    );
};

export default Token;