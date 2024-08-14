import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber'

import GameBoard from './GameBoard';

function Tile(x, y)
{
    this.x = x;
    this.y = y;
    this.token = null;
}

let row1 = [new Tile(0,0), new Tile(1,0), new Tile(2,0)];
let row2 = [new Tile(0,1), new Tile(1,1), new Tile(2,1)];
let row3 = [new Tile(0,2), new Tile(1,2), new Tile(2,2)];
let tiles = [row1, row2, row3];

function is_won(board, type)
{
    return (board[0][0].token == type && board[0][1].token == type && board[0][2].token == type) // Vertical
        || (board[1][0].token == type && board[1][1].token == type && board[1][2].token == type) // Vertical
        || (board[2][0].token == type && board[2][1].token == type && board[2][2].token == type) // Vertical
        || (board[0][0].token == type && board[1][0].token == type && board[2][0].token == type) // Horizontal
        || (board[0][1].token == type && board[1][1].token == type && board[2][1].token == type) // Horizontal
        || (board[0][2].token == type && board[1][2].token == type && board[2][2].token == type) // Horizontal
        || (board[0][0].token == type && board[1][1].token == type && board[2][2].token == type) // Diagonal
        || (board[2][0].token == type && board[1][1].token == type && board[0][2].token == type); // Diagonal
}

function is_tied(board)
{
    let flattenBoard = _.flatten(board);
    return _.every(flattenBoard, (t) =>  t.token);
}

function Player(id, tokenType)
{
    this.id = id;
    this.tokenType = tokenType;
}

const players = [new Player(0, 'o'), new Player(1, 'x')];

const Game = () => {
    const [gameState, setGameState] = useState({
        board: tiles,
        players: players,
        turn: 0,
        isRunning: true,
    });

    // Ref to store the current animation frame ID
    const animationFrameId = useRef(null);

    useEffect(() => {
        const updateGame = () => {

            // Update logic here (e.g., move player, check collisions)
            var is_running = !is_won(gameState.board, gameState.players[gameState.turn].tokenType) && !is_tied(gameState.board);

            setGameState((prevState) =>
            {
                return ({
                    ...prevState,
                    isRunning: is_running 
                })
            });

            // Schedule the next update
            animationFrameId.current = requestAnimationFrame(updateGame);
        };

        // Start the game loop
        if (gameState.isRunning) {
            animationFrameId.current = requestAnimationFrame(updateGame);
        }

        // Cleanup function to cancel the animation frame when the component unmounts
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };

     }, [gameState.isRunning]);



    const handleCubeClick = (event) => {
        const tileName = event.eventObject.name;
        const xIndex = tileName.slice(5,6);
        const yIndex = tileName.slice(6,7);

        if (gameState.isRunning)
        {
            setGameState((prevState) => 
            {
                var isEmpty = prevState.board[yIndex][xIndex].token === null;
                return ({
                    ...prevState,
                    board: prevState.board.map((row, rIndex) =>
                        row.map((tile, cIndex) => {
                            if (rIndex == yIndex && cIndex == xIndex && !tile.token)
                            {
                                tile.token = prevState.players[prevState.turn].tokenType
                                return tile;
                            }
                            return tile;
                        })
                        ),
                    turn: (isEmpty) ? ++prevState.turn % 2 :prevState.turn
                    })
            });
        }
    }

     return (
        <div id="canvas-container" style={{ "width": "90vw", "height": "90vh", "margin": "auto" }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight color="white" position={[0, 0, 100]} />
            <GameBoard tiles={gameState.board} onClick={handleCubeClick}/>
            </Canvas>
        </div>
    );
}

export default Game;