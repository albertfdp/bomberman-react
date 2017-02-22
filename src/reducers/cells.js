import { OrderedMap } from 'immutable'
import {
  GAME_INIT,
  BOMB_DROPED
} from 'constants/actions'

const cells = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case GAME_INIT:
      return new OrderedMap(action.data.cells.map(cell => [ cell.id, cell ]))
    case BOMB_DROPED:
      return state.update(action.data.position, (cell) => (
          cell.set('type', 'bomb')
      ))
    default:
      return state
  }
}

export default cells
