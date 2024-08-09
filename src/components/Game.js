import React, { useState } from 'react';
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
        turn: 0
    });

  const handleCubeClick = (event) => {
    const tileName = event.eventObject.name;
    const xIndex = tileName.slice(5,6);
    const yIndex = tileName.slice(6,7);
    console.log(tileName)


    setGameState((prevState) => 
        {
            var isEmpty = prevState.board[yIndex][xIndex].token === null ;
            return ({
                ...prevState,
                board: prevState.board.map((row, rIndex) =>
                    row.map((tile, cIndex) => {
                        if (rIndex == yIndex && cIndex == xIndex && !tile.token)
                        {
                            tile.token = players[prevState.turn].tokenType
                            return tile;
                        }
                        return tile;
                    })
                  ),
                turn: (isEmpty) ? ++prevState.turn % 2 :prevState.turn
              })
        }
        );
  }

  return (
    <div id="canvas-container" style={{  "width": "90vw", "height": "90vh", "margin": "auto" }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight color="white" position={[0, 0, 100]} />
          <GameBoard tiles={gameState.board} onClick={handleCubeClick}/>
        </Canvas>
      </div>
  );
}

export default Game;