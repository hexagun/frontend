import React from 'react';

import * as THREE from 'three';

function XShape() {
    
  }

const CrossToken = ({ position }) => {

    const tokenStyle = {
        scaleX: 0.8,
        scaleY: 0.2,
        scaleZ: 0.2,
    };

    // Create the first part of the "X"
    const part1 = new THREE.BoxGeometry(tokenStyle.scaleX, tokenStyle.scaleY, tokenStyle.scaleZ);
    const part1Mesh = <mesh geometry={part1} position={position} rotation={[0, 0, Math.PI / 4]}>
                        <meshBasicMaterial color="black" />
                    </mesh>;

    // Create the second part of the "X"
    const part2 = new THREE.BoxGeometry(tokenStyle.scaleX, tokenStyle.scaleY, tokenStyle.scaleZ);
    const part2Mesh = <mesh geometry={part2} position={position} rotation={[0, 0, -Math.PI / 4]}>
                        <meshBasicMaterial color="black" />
                    </mesh>;

    return (
    <>
        {part1Mesh}
        {part2Mesh}
    </>
    );
};

export default CrossToken;