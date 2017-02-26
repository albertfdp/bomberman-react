import { combineReducers } from 'redux'

import bombs from './bombs'
import cells from './cells'
import positions from './positions'
import players from './players'
import emojis from './emojis'
import welcome from './welcome'

export default combineReducers({
  bombs,
  cells,
  emojis,
  positions,
  players,
  welcome
})
