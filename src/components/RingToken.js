import React from 'react';

const RingToken = ({ position }) => {

    const tokenStyle = {
        scale: 0.3,
    };

    return (
        <mesh position={position} scale={[tokenStyle.scale, tokenStyle.scale, .2]}>
            <ringGeometry />
            <meshStandardMaterial color="red" transparent />
        </mesh>
    );
};

export default RingToken;