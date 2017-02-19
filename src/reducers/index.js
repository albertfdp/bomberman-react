import { combineReducers } from 'redux'

import board from './board'
import players from './players'
import welcome from './welcome'

export default combineReducers({
  board,
  players,
  welcome
})
