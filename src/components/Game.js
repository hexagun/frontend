import _ from 'lodash';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Canvas } from '@react-three/fiber';

import {playToken} from '../actionCreators';

import GameBoard from './GameBoard';

const selectActivePlayerId = state => state.active_player_id

const Game = () => {    

    const dispatch = useDispatch();
    const active_player_id = useSelector(selectActivePlayerId);

    const token = useSelector(state => {
        const player = _.find(state.players, ['id', active_player_id]);
        return player.token;
    });

    const handleCubeClick = (event) => {
        const tileName = event.eventObject.name;
        const xIndex = tileName.slice(5,6);
        const yIndex = tileName.slice(6,7);
        dispatch(playToken(xIndex, yIndex));
    }

     return (
        <div id="canvas-container" style={{ "width": "90vw", "height": "90vh", "margin": "auto" }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight color="white" position={[0, 0, 100]} />
            <GameBoard onClick={handleCubeClick}/>
            </Canvas>
        </div>
    );
}

export default Game;