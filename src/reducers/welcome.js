import {
  GAME_PLAYER_SELECTED,
  GAME_STARTED
} from 'constants/actions'

const welcome = (state = {}, action) => {
  switch (action.type) {
    case GAME_PLAYER_SELECTED:
      return {
        ...state,
        selected: action.data.id
      }
    case GAME_STARTED:
      return {
        ...state,
        selected: 0
      }
    default:
      return state
  }
}

export default welcome
