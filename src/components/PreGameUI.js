import React from 'react';
import { useDispatch } from 'react-redux';

import { Fullscreen, Container, Text } from '@react-three/uikit'
import { Button } from './default/button'

import { useAuth } from "./AuthContext";
import { showError } from '../actionCreators';
import { ErrorBanner3D } from './ErrorBanner3D';


const ErrorButton = () => {   
      
    const dispatch = useDispatch();
    const simulateError = () => {
        dispatch(showError("Something went wrong!"));
    };

    return (<Button  onClick={simulateError} alignSelf="center" variant="outline" >
                <Text fontSize="24" fontWeight="bold">Trigger Error</Text>
            </Button>);
}

const LogoutButton = () => {
    const { logout } = useAuth();
    return (<Button alignSelf="center" variant="outline" onClick={logout}>
                <Text fontSize="24" fontWeight="bold">Logout</Text>
            </Button>);
}

const OnlineButton = ({ onClick }) => {
    return (<Button alignSelf="center" variant="outline" onClick={onClick}>
                <Text fontSize="24" fontWeight="bold">Online Game</Text>
            </Button>);
}

const PreGameUI = ({ onStartClick, onJoinClick }) => {
    return (        
        <Container gap={24} justifyContent="center" flexDirection="column" flexGrow={1} backgroundOpacity={.8} backgroundColor="white">
            <Container  justifyContent="center" >
                <Text fontSize="48" fontWeight="bold">Tic Tac Toe</Text>
            </Container>
            <Container justifyContent="center" >                
                <ErrorBanner3D/>
            </Container>

            <Container justifyContent="center" >
                <Button alignSelf="center" variant="outline" onClick={onStartClick}>
                    <Text fontSize="24" fontWeight="bold">Local Game</Text>
                </Button>
            </Container>
            <Container justifyContent="center" >                
                <OnlineButton onClick={onJoinClick} />
            </Container>
            <Container justifyContent="center" >                
                <LogoutButton/>
            </Container>

            <Container justifyContent="center" >                
                <ErrorButton/>
            </Container>

        </Container>
    );
};

export default PreGameUI;