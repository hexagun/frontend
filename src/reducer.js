
import _ from 'lodash';

import { Stage } from "./stage"
import { EndGameReason } from "./endGameReason"
import { endGame } from './actionCreators';

const initialState = {
    stage: Stage.PreGame,
    board: [
        [ { x: 0, y: 0, token: null }, { x: 1, y: 0, token: null }, { x: 2, y: 0, token: null }],
        [ { x: 0, y: 1, token: null }, { x: 1, y: 1, token: null }, { x: 2, y: 1, token: null }],
        [ { x: 0, y: 2, token: null }, { x: 1, y: 2, token: null }, { x: 2, y: 2, token: null }],
    ],
    active_player_id: 0,
    players: [{ id: 0, name: "Player 1", elo: 1000, token: "o" }, { id: 1, name: "Player 2", elo: 1000, token: "x" }],
    endgame: { reason: EndGameReason.NotEnded, info: {} }
  }
  
  // Use the initialState as a default value
  export default function appReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
      // Do something here based on the different types of actions
        case 'board/playToken': {        
            return {
                // Again copy the entire state object
                ...state,
                board: state.board.map((row, rIndex) =>
                    row.map((tile, cIndex) => {
                        if (rIndex == action.payload.y && cIndex == action.payload.x && !tile.token)
                        {
                            tile.token = action.payload.token
                            return tile;
                        }
                        return tile;
                    })
                ),
            }
        }
        case 'stage/startGame': {
            return { ...state,
                stage: Stage.InGame
            }
        }
        case 'stage/restartGame': {
            return { ...state,
                stage: Stage.InGame,
                board: state.board.map((row, rIndex) =>
                    row.map((tile, cIndex) => {
                            tile.token = null
                            return tile;
                    })
                ),
                active_player_id: (state.active_player_id == 0) ? 1 : 0,
                players: state.players.map(p => p),
                endgame: { reason: EndGameReason.NotEnded, info: {} }
            }
        }
        case 'endgame/winGame': {
            return { ...state,
                stage: Stage.Ended,
                endgame: { reason: EndGameReason.GameWon, info: action.payload }
            }
        }
        case 'endgame/tieGame': {
            return { ...state,
                stage: Stage.Ended,
                endgame: { reason: EndGameReason.GameTied, info: action.payload }
            }
        }
        case 'endgame/postGame': {
            return { ...state,
                stage: Stage.PostGame
            }
        }

        case 'active_player_id/switch' : {
            return { ...state,
                active_player_id: action.payload
            }
        }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
