import { Stage } from "./stage"
import { Move }  from "./actionTypes"
import { SendMessage } from './socket';

function determine_winning_line(board, type) {
    if (       board[0][0].token == type && board[0][1].token == type && board[0][2].token == type) {// Horizontal
        return 'row1';
    } else if (board[1][0].token == type && board[1][1].token == type && board[1][2].token == type) {// Horizontal
        return 'row2';
    } else if (board[2][0].token == type && board[2][1].token == type && board[2][2].token == type) {// Horizontal
        return 'row3';
    } else if (board[0][0].token == type && board[1][0].token == type && board[2][0].token == type) {// Vertical
        return 'column1';
    } else if (board[0][1].token == type && board[1][1].token == type && board[2][1].token == type) {// Vertical
        return 'column2';
    } else if (board[0][2].token == type && board[1][2].token == type && board[2][2].token == type) {// Vertical
        return 'column3';
    } else if (board[0][0].token == type && board[1][1].token == type && board[2][2].token == type) {// Diagonal
        return 'diagonal1';
    } else if (board[2][0].token == type && board[1][1].token == type && board[0][2].token == type) {// Diagonal
        return 'diagonal2';
    } else {
        return '';
    }
}

function is_tied(board)
{
    let flattenBoard = _.flatten(board);
    return _.every(flattenBoard, (t) =>  t.token);
}

export function endGame() {
    return function endGameThunk(dispatch, getState) {
        setTimeout(() => {
            console.log('Trigger postgame: ');
            dispatch({type: 'endgame/postGame'});
          }, 1000)
    }
}




export function playTokenOnline(xIndex, yIndex) {
    return function playTokenThunk(dispatch, getState) {
        const active_player_id = getState().active_player_id;
        const currentPlayer =  getState().players[0];
        const active_player =  getState().players[active_player_id];
        const token = active_player.token;
        
        if (currentPlayer.id != getState().players[active_player_id].id) {
            console.log("Not your turn.");
            return;
        }

        const stage =  getState().stage;
        const board = getState().board;
        const tile = board[yIndex][xIndex];

        console.log(yIndex);
        if (tile.token || stage !== Stage.InGame) {
            console.log("Already occupied or not in game.");
            return;
        }

        console.log(`row:${xIndex} col:${yIndex}`);


        SendMessage(Move, currentPlayer.id, {'row': xIndex, 'col': yIndex })(dispatch);
        //dispatch({ type: 'board/playToken', payload: { x: xIndex, y: yIndex, token: token } });
    }
}

export function playToken(xIndex, yIndex) {
    return function playTokenThunk(dispatch, getState) {
        const active_player_id = getState().active_player_id;
        const other_player_id = (active_player_id == 0) ? 1 : 0; 
        const active_player =  getState().players[active_player_id];
        const token = active_player.token;
        const board = getState().board;
        const stage =  getState().stage;
        const tile = board[yIndex][xIndex];
        
        if (tile.token || stage !== Stage.InGame)
            return;
        
        dispatch({ type: 'board/playToken', payload: { x: xIndex, y: yIndex, token: token } });

        var winningLine = determine_winning_line(board, token);
        if (winningLine)
        {
            console.log(`Game is won by player ${active_player_id} with line ${winningLine}`);
            dispatch({type: 'endgame/winGame', payload: {line: winningLine, winner: active_player_id }});
            dispatch(endGame());
            return;
        }

        if (is_tied(board))
        {
            console.log(`Game is tied`);
            dispatch({type: 'endgame/tieGame'});
            dispatch(endGame());
            return;
        }

        // validation before switching => a token was played and game is not over
        dispatch({ type: 'active_player_id/switch', payload: other_player_id });
    }
}

export const startGame = () => {
    return {
      type: 'stage/startGame'
    }
  }

export const startGameOnline = (action) => {
    
    return async function joinGameThunk(dispatch, getState) {
        console.log(`Update opponent. action: ${action.payload}`)
        dispatch(joinGame(action.gameId, action.payload.OpponentID));
        dispatch({
            type: 'stage/startGameOnline',
            payload: action.payload
        })
    }
}

export const joinGame = (gameId, playerId) => {
    return async function joinGameThunk(dispatch, getState) {
        console.log("Stuck here?")
        dispatch( updatePlayerUI(playerId) );

        dispatch({
        type: 'stage/joinGame',
        payload: {
                gameId: gameId,
                playerId: playerId,
            }
        })
    }
  }

export const gameStateUpdate = (board, nextTurn) => {
    return {
      type: 'board/gameStateUpdate',
      payload: {
        Board: board,
        NextTurn: nextTurn,
    }
    }
  }

  export const playerUpdate = (playerId, name, elo) => {
    return {
      type: 'player/updatePlayer',
      payload: {
            id: playerId,
            name: name,
            elo: elo,
        }
    }
  }



export function updatePlayerUI(playerId) {
    return async function updatePlayerUIThunk(dispatch, getState) {

        console.log("hello from the other side")
        const response = await fetch(`/api/user/${playerId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            console.log('User from server: ', response)
            const user = await response.json();
            console.log('User from server: ', user)

            // some Dispatch here
            dispatch(playerUpdate(playerId, user.username, user.elo))
        } else {
            console.log('User request failed.')
        }
        return 1;
    }
}

export const restartGame = () => {
return {
    type: 'stage/restartGame'
}
}

export const setError = (message) => ({
  type: "error/setError",
  payload: message,
});

export const clearError = () => ({
  type: "error/clearError",
});

// Thunk to show the error temporarily
export const showError = (message, timeout = 3000) => (dispatch) => {
  dispatch(setError(message));
  setTimeout(() => {
    dispatch(clearError());
  }, timeout);
};