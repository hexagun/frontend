import React from 'react';

import { useSelector } from 'react-redux';
import { Container, Text } from '@react-three/uikit'
import { Button } from './default/button'

import { EndGameReason } from '../endGameReason';

const PostGameUI = ({ onClick }) => {

    const players = useSelector(state => state.players);
    const active_player_id = useSelector(state => state.active_player_id);

    const endgame = useSelector((state) => state.endgame);
    const is_won =  endgame.reason === EndGameReason.GameWon;    

    const drawEndMessage = () =>
    {
        if (is_won)
        {
            return <Text fontSize="48" fontWeight="bold">{players[active_player_id].name} wins!</Text>;
        }
        return <Text fontSize="48" fontWeight="bold">It's a draw!</Text>;
    }

    return (
        <Container gap={24} justifyContent="center" flexDirection="column" flexGrow={1} backgroundOpacity={.8} backgroundColor="white">
            <Container  justifyContent="center" >
                { drawEndMessage() }
            </Container>
            <Container justifyContent="center" >
                <Button alignSelf="center" variant="outline" onClick={onClick}>
                    <Text fontSize="18" fontWeight="bold">Restart Game</Text>
                </Button>
            </Container>
        </Container>
    );
};

export default PostGameUI;