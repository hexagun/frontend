// actionTypes.js
import { WS_CONNECT, WS_DISCONNECT, WS_ERROR, WS_MESSAGE_RECEIVED } from './actionTypes';

import { startGameOnline, joinGame, gameStateUpdate, endGame, showError } from './actionCreators';

let ws; // WebSocket instance
let gameId;
// Action to handle WebSocket connection
export const connectWebSocket = (serverUrl, playerId) => {
  return (dispatch) => {
     {
      if (ws) {
        dispatch(showError("Already Connected"));
        return;
      }

      ws = new WebSocket(serverUrl);
      console.log(ws);
      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        dispatch({ type: WS_CONNECT });
       // dispatch(joinGame())
      };

      ws.onmessage = (event) => {
        console.log('Message from server:', event.data);
        // Dispatch a message received action

        var action = JSON.parse(event.data);

        if (action.type == null) {
          console.log('Parsing error.');
          return;
        }

        console.log(action.type);

        switch (action.type) {
          case "start" : {
            console.log(action.payload);
            dispatch(startGameOnline(action));
            break;
          }
          case "join": {
            gameId = action.gameId;
            console.log(action);
            dispatch(joinGame(gameId, action.playerId));
            
            break;
          }
          case "gamestateupdate": {
            console.log(action);
            dispatch(gameStateUpdate(action.payload.Board, action.payload.NextTurn));
            break;
          }
          case "gameover": {
            console.log(action);
            if (action.payload.Winner && action.payload.Winner != "") { // Win

              function determine_winning_line(board, type) {
                  if (       board[0][0] == type && board[0][1]== type && board[0][2] == type) {// Horizontal
                      return 'row1';
                  } else if (board[1][0] == type && board[1][1] == type && board[1][2] == type) {// Horizontal
                      return 'row2';
                  } else if (board[2][0] == type && board[2][1]== type && board[2][2] == type) {// Horizontal
                      return 'row3';
                  } else if (board[0][0] == type && board[1][0] == type && board[2][0] == type) {// Vertical
                      return 'column1';
                  } else if (board[0][1] == type && board[1][1] == type && board[2][1] == type) {// Vertical
                      return 'column2';
                  } else if (board[0][2] == type && board[1][2] == type && board[2][2] == type) {// Vertical
                      return 'column3';
                  } else if (board[0][0] == type && board[1][1] == type && board[2][2]== type) {// Diagonal
                      return 'diagonal1';
                  } else if (board[2][0] == type && board[1][1] == type && board[0][2] == type) {// Diagonal
                      return 'diagonal2';
                  } else {
                      return '';
                  }
              }

              var winningLine = determine_winning_line(action.payload.Board, "o");
              console.log(winningLine);
              winningLine = (winningLine != '') ? winningLine : determine_winning_line(action.payload.Board, "x");
              console.log(winningLine);
              dispatch(gameStateUpdate(action.payload.Board, action.payload.Winner)); // Update board one last time
              dispatch({type: 'endgame/winGame', payload: {line: winningLine, winner: action.payload.Winner }});
              dispatch(endGame());
            } else { // Tie
              dispatch({type: 'endgame/tieGame'});
              dispatch(endGame());
            }
            break;
          }
        }
       
        dispatch({
          type: WS_MESSAGE_RECEIVED,
          payload: JSON.parse(event.data), // Assuming the message is in JSON format
        });
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        ws = null;
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        dispatch(showError("WebSocket error"));
      };
    }    
  };
};

export const SendMessage = ( type, playerId, payload ) => {
  return (dispatch) => {
    if (ws) {
        // Example: Send a join message to the server
        console.log(payload);
        ws.send(JSON.stringify(
        {
            type: type,
            gameId: gameId,
            playerId: `${playerId}`,
            payload: payload
        },
        (key, value) => {
          // If the key is 'age' or 'quantity' and the value is a string,
          // attempt to convert it to an integer.
          if ((key === "row" || key === "col") && typeof value === "string") {
            

            const parsedInt = parseInt(value, 10);
            console.log(`parsedInt: ${parsedInt}`);
            // Return the parsed integer if it's a valid number, otherwise return the original value.
            return isNaN(parsedInt) ? value : parsedInt;
          }
          // For all other cases, return the original value.
          return value;
        }));
    }
  }
}

// Action to disconnect WebSocket
export const disconnectWebSocket = () => {
  return (dispatch) => {
    if (ws) {
      ws.close();
      ws = null;
      dispatch({ type: WS_DISCONNECT });
    }
  };
};