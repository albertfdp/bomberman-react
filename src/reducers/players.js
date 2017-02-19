import { List } from 'immutable'
import {
  GAME_PLAYER_CHANGE_COLOR,
  GAME_PLAYER_CHANGE_TYPE,
  GAME_INIT
} from 'constants/actions'

const players = (state = new List(), action) => {
  switch (action.type) {
    case GAME_INIT:
      return new List(action.data.players)
    case GAME_PLAYER_CHANGE_COLOR:
      return state.update(
        state.findIndex(player => player.id === action.data.id),
        (player) => player.set('icon', action.data.icon)
      )
    case GAME_PLAYER_CHANGE_TYPE:
      return state.update(
        state.findIndex(player => player.id === action.data.id),
        (player) => {
          const type = player.type === 'man' ? 'com' : 'man'
          return player.set('type', type)
        }
      )
    default:
      return state
  }
}

export default players
