import {
  GAME_PLAYER_SELECTED,
  GAME_INIT
} from 'constants/actions'

const welcome = (state = {}, action) => {
  switch (action.type) {
    case GAME_PLAYER_SELECTED:
      return {
        ...state,
        selected: action.data.id
      }
    case GAME_INIT:
      return {
        ...state,
        selected: 0
      }
    default:
      return state
  }
}

export default welcome
