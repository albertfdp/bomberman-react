import { Board } from 'records'
import {
  GAME_STARTED
} from 'constants/actions'

const board = (state = new Board(), action) => {
  switch (action.type) {
    case GAME_STARTED:
      return Board.create()
    default:
      return state
  }
}

export default board
