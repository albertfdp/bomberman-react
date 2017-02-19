import { OrderedMap } from 'immutable'
import {
  GAME_START,
  PLAYER_MOVE
} from 'constants/actions'

const positions = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case GAME_START:
      return new OrderedMap(action.data.positions)
    case PLAYER_MOVE:
      return state.set(action.data.id, action.data.position)
    default:
      return state
  }
}

export default positions
