import { combineReducers } from 'redux'

import board from './board'
import positions from './positions'
import players from './players'
import welcome from './welcome'

export default combineReducers({
  board,
  positions,
  players,
  welcome
})
