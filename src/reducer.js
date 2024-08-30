
import _ from 'lodash';

import { Stage } from "./stage"

const initialState = {
    stage: Stage.PreGame,
    board: [
        [ { x: 0, y: 0, token: null }, { x: 1, y: 0, token: null }, { x: 2, y: 0, token: null }],
        [ { x: 0, y: 1, token: null }, { x: 1, y: 1, token: null }, { x: 2, y: 1, token: null }],
        [ { x: 0, y: 2, token: null }, { x: 1, y: 2, token: null }, { x: 2, y: 2, token: null }],
    ],
    active_player_id: 0,
    players: [{ id: 0, token: "o" }, { id: 1, token: "x" }],
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
                // This time, we need to make a copy of the old todos array
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
        case 'stage/endGame': {
            return { ...state,
                stage: Stage.EndGame
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
