import { Board } from 'records'
import {
  GAME_INIT,
  BOMB_DROPED
} from 'constants/actions'

const board = (state = new Board(), action) => {
  switch (action.type) {
    case GAME_INIT:
      return Board.create()
    case BOMB_DROPED:
      return state.updateIn([ 'cells' ], (cells) => {
        return cells.update(action.data.position, (cell) => (
          cell.set('type', 'bomb')
        ))
      })
    default:
      return state
  }
}

export default board
