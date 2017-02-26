import { OrderedMap } from 'immutable'

import {
  BOMB_DROPED,
  BOMB_EXPLODED
} from 'constants/actions'

const positions = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case BOMB_DROPED: {
      const { bomb } = action.data
      return state.set(bomb.id, bomb)
    }
    case BOMB_EXPLODED: {
      const { bombs } = action.data

      return state.filter(bomb => {
        return !bombs.has(bomb.id)
      })
    }
    default:
      return state
  }
}

export default positions
