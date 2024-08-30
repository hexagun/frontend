import _ from 'lodash';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Canvas } from '@react-three/fiber';

import { playToken, startGame } from '../actionCreators';

import GameBoard from './GameBoard';
import PreGameUI from './PreGameUI';


const Game = () => {
    const dispatch = useDispatch();
    const stage = useSelector(state => state.stage);

    const handleCubeClick = (event) => {
        const tileName = event.eventObject.name;
        const xIndex = tileName.slice(5,6);
        const yIndex = tileName.slice(6,7);
        dispatch(playToken(xIndex, yIndex));
    }

    const handleButtonClick = () => {
        dispatch(startGame());
    }

    return (
        <div id="canvas-container" style={{ "width": "90vw", "height": "90vh", "margin": "auto" }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[0, 0, 100]} />
                {stage &&
                    {
                        PreGame :  <PreGameUI onClick={handleButtonClick}/>,
                        InGame : <GameBoard onClick={handleCubeClick}/>,
                    }[stage]
                }
            </Canvas>
        </div>
    );
}

export default Game;