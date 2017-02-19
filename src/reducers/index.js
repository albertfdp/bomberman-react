import { combineReducers } from 'redux'

import board from './board'
import positions from './positions'
import players from './players'
import emojis from './emojis'
import welcome from './welcome'

export default combineReducers({
  board,
  emojis,
  positions,
  players,
  welcome
})
