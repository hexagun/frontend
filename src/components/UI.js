import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fullscreen } from '@react-three/uikit'

import { Stage } from '../stage';
import PreGameUI from './PreGameUI';
import InGameUI from './InGameUI';
import PostGameUI from './PostGameUI';

import { startGame, restartGame } from '../actionCreators';

const UI = () => {
    const stage = useSelector(state => state.stage);
    const dispatch = useDispatch();

    const handleStartButtonClick = () => {
        dispatch(startGame());
    }

    const handleRestartButtonClick = () => {
        dispatch(restartGame());
    }
    
    const renderSwitch = (param) => {
        switch(param) {
            case Stage.PreGame:
                return (<PreGameUI onClick={handleStartButtonClick}/>);
            case Stage.InGame:
                return <InGameUI/>;
            case Stage.Ended:
                return <InGameUI/>;
            case Stage.PostGame:
                return <PostGameUI onClick={handleRestartButtonClick}/>;
            default:
                return 'error';
        }
      }

    return (
        <Fullscreen flexDirection="row" padding={10} gap={10}>
            { renderSwitch(stage) }
        </Fullscreen>
    );
}

export default UI;