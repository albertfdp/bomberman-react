import { List } from 'immutable'
import { Player } from 'records'
import randomcolor from 'randomcolor'

import {
  GAME_PLAYER_CHANGE_COLOR,
  GAME_PLAYER_CHANGE_TYPE,
  GAME_PLAYER_SELECTED,
  GAME_STARTED
} from 'constants/actions'

export const start = () => {
  const players = new List([
    new Player({ id: 0, name: 'Player 1', type: 'man', color: '#fff' }),
    new Player({ id: 1, name: 'Player 2', type: 'com', color: '#000' }),
    new Player({ id: 2, name: 'Player 3', type: 'com', color: '#f00' }),
    new Player({ id: 3, name: 'Player 4', type: 'com', color: '#00f' })
  ])

  return {
    type: GAME_STARTED,
    data: { players }
  }
}

export const changeColor = () => (dispatch, getState) => {
  const { welcome: { selected }, players } = getState()
  const colors = players.map(player => player.color)
  let color = randomcolor()
  while (colors.includes(color)) { color = randomcolor() }

  return dispatch({
    type: GAME_PLAYER_CHANGE_COLOR,
    data: { id: selected, color }
  })
}

export const changeType = () => (dispatch, getState) => {
  const { welcome: { selected } } = getState()

  return dispatch({
    type: GAME_PLAYER_CHANGE_TYPE,
    data: { id: selected }
  })
}

export const previousPlayer = () => (dispatch, getState) => {
  const { welcome: { selected } } = getState()

  const previous = (selected === 0) ? 3 : (selected - 1)
  return dispatch(selectPlayer(previous))
}

export const nextPlayer = () => (dispatch, getState) => {
  const { welcome: { selected = 0 } } = getState()

  const next = (selected === 3) ? 0 : (selected + 1)
  return dispatch(selectPlayer(next))
}

export const selectPlayer = (id) => ({
  type: GAME_PLAYER_SELECTED,
  data: { id }
})
