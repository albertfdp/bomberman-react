import { List } from 'immutable'
import {
  GAME_INIT
} from 'constants/actions'

const emojis = (state = new List(), action) => {
  switch (action.type) {
    case GAME_INIT:
      return new List(action.data.emojis)
    default:
      return state
  }
}

export default emojis
