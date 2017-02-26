import { OrderedMap } from 'immutable'
import {
  GAME_INIT,
  BOMB_DROPED,
  BOMB_EXPLODED,
  BOMB_AFTER_BLAST
} from 'constants/actions'

const cells = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case GAME_INIT:
      return new OrderedMap(action.data.cells.map(cell => [ cell.id, cell ]))
    case BOMB_DROPED:
      return state.update(action.data.bomb.position, (cell) => (
          cell.set('type', 'bomb')
      ))
    case BOMB_EXPLODED:
      const { blast } = action.data

      return state.merge(
        blast.map(cell => [ cell.id, cell.set('type', 'blast') ]
      ))
    case BOMB_AFTER_BLAST:
      return state.merge(
        action.data.cells.map(cell => [ cell.id, cell.set('type', 'free') ]
      ))
    default:
      return state
  }
}

export default cells
