import React from 'react';

import { Fullscreen, Container, Text } from '@react-three/uikit'
import { Button } from './default/button'

const PreGameUI = ({ onClick }) => {

    const handleButtonClick = (event) => {

        dispatch(playToken(xIndex, yIndex));
    }

    return (
        <Fullscreen flexDirection="row" padding={10} gap={10}>
            <Container gap={24} justifyContent="center" flexDirection="column" flexGrow={1} backgroundOpacity={.8} backgroundColor="white">
                <Container  justifyContent="center" >
                    <Text fontSize="72" fontWeight="bold">Tic Tac Toe</Text>
                </Container>
                <Container justifyContent="center" >
                    <Button alignSelf="center" variant="outline" onClick={onClick}>
                        <Text fontSize="24" fontWeight="bold">Start Game</Text>
                    </Button>
                </Container>
            </Container>
        </Fullscreen>
    );
};

export default PreGameUI;