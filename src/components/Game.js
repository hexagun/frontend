import _ from 'lodash';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Canvas } from '@react-three/fiber';

import { playToken, playTokenOnline } from '../actionCreators';

import GameBoard from './GameBoard';

import { GameType } from '../gameType';

import StrikeThroughLine from './StrikeThroughLine';
import UI from './UI';



const Game = () => {
    const dispatch = useDispatch();
    const stage = useSelector(state => state.stage);
    const gametype = useSelector(state => state.stage);

    const handleCubeClick = (event) => {

        const tileName = event.eventObject.name;
        const xIndex = tileName.slice(5,6);
        const yIndex = tileName.slice(6,7);
        console.log(event);
        console.log(tileName);
        console.log(xIndex);
        console.log(yIndex);
        if (gametype == GameType.Local) {
            dispatch(playToken(xIndex, yIndex));
        } else { // online
            dispatch(playTokenOnline(xIndex, yIndex));
        }

    }

    const renderSwitch = (param) => {
        switch(param) {          
            case Stage.InGame:
                return <GameBoard onClick={handleCubeClick}/>;
            case Stage.Ended:
                return  (<>
                            <GameBoard onClick={handleCubeClick}/>
                            <StrikeThroughLine/>
                        </>) ;           
            default:
                return 'error';
        }
      }

    return (
        <div id="canvas-container" style={{ "width": "90vw", "height": "90vh", "margin": "auto" }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[0, 0, 100]} />
                <UI/>
                {stage &&
                    {
                        JoinGame : <GameBoard onClick={handleCubeClick}/>,
                        InGame : <GameBoard onClick={handleCubeClick}/>,
                        Ended : <>
                                    <GameBoard onClick={handleCubeClick}/>
                                    <StrikeThroughLine/>
                                    
                                </>                      
                    }[stage]
                }
            </Canvas>
        </div>
    );
}

export default Game;