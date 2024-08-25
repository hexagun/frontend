import React from 'react';
const { Fragment } = React;

import { useSelector } from 'react-redux'

import BoardTile from './BoardTile';
import CrossToken from './CrossToken';
import RingToken from './RingToken';

const selectBoard = state => state.board

const GameBoard = ({ onClick }) => {

    const board = useSelector(selectBoard)

    const boardStyle = {
        width: 1,
        spacing: 0.03
    };
    
    return (
        <>
        {
            board.map((row, j) => {
                return row.map((tile, i)=> {
                    let x = (tile.x - 1) * (boardStyle.width + boardStyle.spacing);
                    let y = (tile.y - 1) * (boardStyle.width + boardStyle.spacing);
                    let tileId = `tile_${tile.x}${tile.y}`;
                    let tokenId = `token_${tile.x}${tile.y}`;
                    return (<Fragment key={tileId}>
                                <BoardTile key={tileId} name={tileId} position={[x, y, 0]} onClick={onClick}/>
                                {tile.token &&
                                    {
                                        'x': <CrossToken key={tokenId} type={tile.token} position={[x, y, 0.05]}/>,
                                        'o': <RingToken key={tokenId} type={tile.token} position={[x, y, 0.05]}/>
                                    }[tile.token]
                                }
                            </Fragment>);
                })
            })
        }        
        </> 
      )
};

export default GameBoard;