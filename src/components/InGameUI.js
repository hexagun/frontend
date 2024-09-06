import React from 'react';

import { useSelector } from 'react-redux';

import { Container, Text } from '@react-three/uikit'

// debug borderColor={"blue"} borderWidth={2}

const InGameUI = () => {
    const players = useSelector(state => state.players);
    const active_player_id = useSelector(state => state.active_player_id);

    

    const drawPlayerUI = (player) => {
        const strColor = (player.token === 'o') ? "red" : "black";
        const fontWeight = (active_player_id === player.id) ? "bold": "normal";
        
        return ( 
            <Container width={"35%"} flexDirection="column" >
                <Container   flexDirection="column">
                    <Text color={strColor} textAlign="center" verticalAlign="top" fontSize="24" fontWeight={fontWeight}>{player.name}</Text>
                    <Text color={strColor} textAlign="center" verticalAlign="top" fontSize="12" fontWeight={fontWeight}>elo:{player.elo}</Text>
                </Container>
            </Container> 
        );
    }

    const drawActiveToken = (player) =>
    {
        const strColor = (player.token === 'o') ? "red" : "black";
        return ( 
            <Container width={"6%"} flexDirection="column" >
                <Text color={strColor} borderColor={"black"} borderWidth={3} textAlign="center" verticalAlign="top" fontSize="36" fontWeight="bold">{player.token}</Text>
            </Container> 
        );
    }

    return (        
        <Container gap={24} justifyContent="center" flexDirection="row" flexGrow={2}>
            { drawPlayerUI(players[0]) }
            { drawActiveToken(players[active_player_id]) }
            { drawPlayerUI(players[1]) }
        </Container>
    );
};

export default InGameUI;