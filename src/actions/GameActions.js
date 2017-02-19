import { List } from 'immutable'
import { Player } from 'records'
import randomcolor from 'randomcolor'

import {
  GAME_START,
  GAME_PLAYER_CHANGE_COLOR,
  GAME_PLAYER_CHANGE_TYPE,
  GAME_PLAYER_SELECTED,
  GAME_INIT,
  PLAYER_MOVE
} from 'constants/actions'

export const init = () => {
  const players = new List([
    new Player({ id: 0, name: 'Player 1', type: 'man', color: '#fff', icon: '😎' }),
    new Player({ id: 1, name: 'Player 2', type: 'com', color: '#000', icon: '🤡' }),
    new Player({ id: 2, name: 'Player 3', type: 'com', color: '#f00', icon: '😡' }),
    new Player({ id: 3, name: 'Player 4', type: 'com', color: '#00f', icon: '👹' })
  ])

  return {
    type: GAME_INIT,
    data: { players }
  }
}

export const startGame = () => (dispatch, getState) => {
  const { players } = getState()
  const initialPositions = [ 16, 28, 166, 178 ]

  const positions = players.map(player => (
    [ player.id, initialPositions[player.id] ]
  ))

  return dispatch({
    type: GAME_START,
    data: { positions }
  })
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

const ROW_LENGTH = 15

export const moveUp = () => (dispatch, getState) => {
  const { board, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = currentPosition - ROW_LENGTH

  if (board.cells.get(nextPosition) && board.cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const moveDown = () => (dispatch, getState) => {
  const { board, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = currentPosition + ROW_LENGTH

  if (board.cells.get(nextPosition) && board.cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const moveLeft = () => (dispatch, getState) => {
  const { board, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = currentPosition - 1

  if (board.cells.get(nextPosition) && board.cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const moveRight = () => (dispatch, getState) => {
  const { board, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = currentPosition + 1

  if (board.cells.get(nextPosition) && board.cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const selectPlayer = (id) => ({
  type: GAME_PLAYER_SELECTED,
  data: { id }
})
