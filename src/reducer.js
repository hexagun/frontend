
import _ from 'lodash';

import { GameType } from "./gameType"
import { Stage } from "./stage"
import { EndGameReason } from "./endGameReason"
import { endGame } from './actionCreators';

const initialState = {
    gameType: GameType.Local,
    stage: Stage.PreGame,
    board: [
        [ { x: 0, y: 0, token: null }, { x: 1, y: 0, token: null }, { x: 2, y: 0, token: null }],
        [ { x: 0, y: 1, token: null }, { x: 1, y: 1, token: null }, { x: 2, y: 1, token: null }],
        [ { x: 0, y: 2, token: null }, { x: 1, y: 2, token: null }, { x: 2, y: 2, token: null }],
    ],
    active_player_id: 0,
    players: [],
    endgame: { reason: EndGameReason.NotEnded, info: {} },
    error: "",
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
                        }
                        return tile;
                    })
                ),
            }
        }
        case 'board/gameStateUpdate': {    
            
            let active_player_id = 0;

            state.players.map((player, index) => {
                    if (player.id == action.payload.NextTurn) {                        
                         active_player_id = index;
                    }
                    return player;
                })

            return {
                // Again copy the entire state object
                ...state,
                board: action.payload.Board.map((row, rIndex) =>
                    row.map((tile, cIndex) => {
                        console.log(tile)
                        return {
                            x: cIndex,
                            y: rIndex,
                            token: tile
                        }
                    })
                ),
                active_player_id : active_player_id
            }
        }
        case 'stage/startGame': {
            return { ...state,
                gameType: GameType.Local,
                stage: Stage.InGame
            }
        }
        case 'stage/startGameOnline': {
            let active_player_id = 0;
            let players = state.players.map((player, index) => {
                // Setting opponent                    
                if (index == 1) {
                    player.id = action.payload.OpponentID
                } 

                // Setting token
                if (index == 0) {
                    player.token = action.payload.YourToken;
                } else { // opponent
                    player.token = (action.payload.YourToken == 'o') ? 'x' : 'o';
                }
                
                // Setting first turn
                if (player.id == action.payload.FirstTurn) {
                    
                    active_player_id = index;  
                }

                console.log(`${player.name}'s token is ${player.token}`)
                console.log(`First turn:${action.payload.FirstTurn}`)
                console.log(`Active Player id:${active_player_id}`)

                return player;
            })


            return { ...state,
                stage: Stage.InGame,
                gameType: GameType.Online,
                players: players,
                active_player_id: active_player_id,
            }
        }
        case 'stage/joinGame': {

            if (state.players.length >= 2) {
                // Optional: silently ignore, or you could throw/log/warn
                return state; // no change
            }
            
            const addPlayer = { id: action.payload.playerId, name: "", elo: 0, token: "-" };

            return {
                ...state,
                stage: Stage.JoinGame,
                players: [...state.players, addPlayer]
            };

            // return { ...state,
            //     stage: Stage.JoinGame,
            //     players: state.players.map((player, index)=> {
            //         if (index == 0)
            //         {
            //             console.log(action);
            //             player.id = action.payload.playerId;
            //             player.name = action.payload.playerId;
            //         }
            //         return player;
            //     })
            // }
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

        case 'player/updatePlayer': {
            const updatedPlayer = action.payload;
            return {
                ...state,
                players: state.players.map(player =>
                    player.id === updatedPlayer.id ? { ...player, ...updatedPlayer } : player
                )
        };
}
        // case 'player/updatePlayer' : {
        //     return { ...state,
        //         players: state.players.map((player, index)=> {
        //             if (player.id == -1) // empty
        //             {         
        //                 player.id = 
        //                 player.name = action.payload.Name;
        //                 player.elo = action.payload.Elo;
        //             }
        //             return player;
        //         })
        //     }
        // }

        case 'menu/main' : {
            return initialState
        }
        
        case 'error/setError' : {
            return { ...state,
                error: action.payload
            }
        }
        case 'error/clearError' : {
            return { ...state,
                error: ""
            }
        }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
