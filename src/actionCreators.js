
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

export function playToken(xIndex, yIndex) {
    return function playTokenThunk(dispatch, getState) {
        const active_player_id = getState().active_player_id;
        const other_player_id = (active_player_id == 0) ? 1 : 0; 
        const active_player =  getState().players[active_player_id];
        const token = active_player.token;
        const board = getState().board;
        const tile = board[yIndex][xIndex];
        
        if (tile.token)
            return;
        
        dispatch({ type: 'board/playToken', payload: { x: xIndex, y: yIndex, token: token } });

        if (is_won(board, token))
        {
            console.log(`Game is won by player ${active_player_id}`);
            return;
        }

        if (is_tied(board))
        {
            console.log(`Game is tied`);
            return;
        }

        // validation before switching => a token was played and game is not over
        dispatch({ type: 'active_player_id/switch', payload: other_player_id });
    }
}
