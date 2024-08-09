import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'

import GameBoard from './GameBoard';

function Tile(x, y)
{
    this.x = x;
    this.y = y;
}

const row1 = [new Tile(0,0), new Tile(1,0), new Tile(2,0)];
const row2 = [new Tile(0,1), new Tile(1,1), new Tile(2,1)];
const row3 = [new Tile(0,2), new Tile(1,2), new Tile(2,2)];
const tiles = [row1, row2, row3];

function Token(x, y, type)
{
    Tile.call(this, x, y);
    this.type = type;
}

function Player(tokenType)
{
    this.tokenType = tokenType;
}

const Game = () => {
  //const [gameState, setGameState] = useState({ tokens: [] });
  const [tokens, setTokens] = useState([]);

  const handleCubeClick = (event) => {
    console.log(event.eventObject)
    setTokens([...tokens, { position: event.eventObject.position }]);
  }

  return (
    <div id="canvas-container" style={{  "width": "90vw", "height": "90vh", "margin": "auto" }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight color="white" position={[0, 0, 100]} />
          <GameBoard tiles={tiles} tokens={tokens} onClick={handleCubeClick}/>
        </Canvas>
      </div>
  );
}

export default Game;