import { combineReducers } from 'redux'
import players from './players'
import welcome from './welcome'

export default combineReducers({
  players,
  welcome
})
