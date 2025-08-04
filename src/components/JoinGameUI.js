import React from 'react';

import { useSelector } from 'react-redux';
import { Container, Text } from '@react-three/uikit'

const JoinGameUI = ({ onClick }) => {

    // const players = useSelector(state => state.players);
    // const active_player_id = useSelector(state => state.active_player_id); 

    const drawJoinMessage = () =>
    {
        return <Text fontSize="48" fontWeight="bold">Waiting for opponent...</Text>;
    }

    return (
        <Container gap={24} justifyContent="center" flexDirection="column" flexGrow={1} backgroundOpacity={.2} backgroundColor="white">
            <Container  justifyContent="center" >
                { drawJoinMessage() }
            </Container>
        </Container>
    );
};

export default JoinGameUI;