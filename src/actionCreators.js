import { Stage } from "./stage"

function determine_winning_line(board, type)
{
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

  export const restartGame = () => {
    return {
      type: 'stage/restartGame'
    }
  }