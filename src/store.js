import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from './reducer'

const delayedMessageMiddleware = storeAPI => next => action => {
    if (action.type === 'board/playToken') {
      setTimeout(() => {
        console.log('Token played: ', action.payload)
      }, 1000)
    }
  
    return next(action)
  }

const middlewareEnhancer = applyMiddleware(delayedMessageMiddleware, thunk)

const store = createStore(rootReducer, composeWithDevTools( middlewareEnhancer ) )

export default store