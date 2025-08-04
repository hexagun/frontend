import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fullscreen } from '@react-three/uikit'

import { Stage } from '../stage';
import PreGameUI from './PreGameUI';
import JoinGameUI from './JoinGameUI';
import InGameUI from './InGameUI';
import PostGameUI from './PostGameUI';
import {ErrorBanner3D} from './ErrorBanner3D';

import {connectWebSocket} from '../socket';
import { startGame, restartGame } from '../actionCreators';

import { useAuth } from "./AuthContext";

const UI = () => {
    const stage = useSelector(state => state.stage);
    const dispatch = useDispatch();
    const { token } = useAuth();
    
    const handleStartButtonClick = () => {
        dispatch(startGame());
    }

    const handleJoinButtonClick = () => {

        const params = new URLSearchParams({
                    token: token,
                });

        dispatch(connectWebSocket(`ws://${window.location.hostname}:8100/ws?${params.toString()}`)) // Pass server URL and playerId
    };

    const handleRestartButtonClick = () => {
        dispatch(restartGame());
    }
    
    const renderSwitch = (param) => {
        switch(param) {
            case Stage.PreGame: {
                return (<PreGameUI onStartClick={handleStartButtonClick} onJoinClick={handleJoinButtonClick}/>);
            }
            case Stage.JoinGame: {
                return <><InGameUI/><JoinGameUI/></>
            }
            case Stage.InGame:{
                return <InGameUI/>;
            }
            case Stage.Ended: {
                return <InGameUI/>;
            }
            case Stage.PostGame: {
                return <PostGameUI onClick={handleRestartButtonClick}/>;
            }
            default:
                return 'error';
        }
      }

    return (
        <>
        <Fullscreen flexDirection="column" padding={10} gap={10}>
            { renderSwitch(stage) }
        </Fullscreen>

        </>

    );
}

export default UI;