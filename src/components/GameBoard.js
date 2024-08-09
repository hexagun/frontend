import React from 'react';

import BoardTile from './BoardTile';
import Token from './Token';

const GameBoard = ({ tiles, tokens, onClick }) => {

    const boardStyle = {
        width: 1,
        spacing: 0.03
    };
    
    const tokenStyle = {
        width: 0.5,
        spacing: 0.03
    };

    return (
        <>
        {(() => {
                const tilesArr = [];
                for (let j = 0; j < tiles.length; j++) {
                    for (let i = 0; i < tiles[j].length; i++) {
                        const element = tiles[j][i];
                        let x = (element.x - 1) * (boardStyle.width + boardStyle.spacing);
                        let y = (element.y - 1) * (boardStyle.width + boardStyle.spacing);
                        tilesArr.push(<BoardTile position={[x, y, 0]} onClick={onClick}/>);
                    }
                }
                return tilesArr;
            })()}
        {
            tokens.map((token, index) => (
                <Token
                    key={index}
                    position={token.position}
                />))        
        }
        </> 
      )
};

export default GameBoard;