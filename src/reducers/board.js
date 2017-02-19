import { Board } from 'records'
import {
  GAME_INIT
} from 'constants/actions'

const board = (state = new Board(), action) => {
  switch (action.type) {
    case GAME_INIT:
      return Board.create()
    default:
      return state
  }
}

export default board
