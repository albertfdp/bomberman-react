import { combineReducers } from 'redux'

import cells from './cells'
import positions from './positions'
import players from './players'
import emojis from './emojis'
import welcome from './welcome'

export default combineReducers({
  cells,
  emojis,
  positions,
  players,
  welcome
})
