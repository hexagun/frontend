import React from 'react';

const BoardTile = ({ position, onClick }) => {

    const tileStyle = {
        scale: 1,
    };

    return (
        <mesh position={position} scale={[tileStyle.scale, tileStyle.scale, .08]} onClick={onClick}>
            <boxGeometry />
            <meshStandardMaterial color="lightgrey" transparent />
        </mesh>
    );
};

export default BoardTile;