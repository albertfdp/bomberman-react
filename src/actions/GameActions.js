import { List } from 'immutable'
import { Cell, Player } from 'records'
import emojisList from 'emojis-list'

import { ROWS, COLUMNS } from 'constants'

import {
  BOMB_DROPED,
  GAME_START,
  GAME_PLAYER_CHANGE_COLOR,
  GAME_PLAYER_CHANGE_TYPE,
  GAME_PLAYER_SELECTED,
  GAME_INIT,
  PLAYER_MOVE
} from 'constants/actions'

const freeCells = [ '1-1', '2-1', '10-1', '11-1', '1-2', '11-2', '1-12', '1-13', '2-13', '10-13', '11-12', '11-13' ]

export const init = () => {
  const emojis = new List(emojisList)

  const players = new List([
    new Player({ id: 0, name: 'Player 1', type: 'man', icon: '😎' }),
    new Player({ id: 1, name: 'Player 2', type: 'com', icon: '🤡' }),
    new Player({ id: 2, name: 'Player 3', type: 'com', icon: '😡' }),
    new Player({ id: 3, name: 'Player 4', type: 'com', icon: '👹' })
  ])

  const cells = []

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const type = ((column === 0 || column === (COLUMNS - 1) || row === 0 || row === (ROWS - 1)) || ((column % 2 === 0) && (row % 2 === 0)))
        ? 'wall'
        : freeCells.includes(`${row}-${column}`) ? 'free' : 'block'
      cells.push(new Cell({ column, row, type }))
    }
  }

  return {
    type: GAME_INIT,
    data: { players, emojis, cells }
  }
}

export const startGame = () => (dispatch, getState) => {
  const { players } = getState()
  const initialPositions = [ '1-1', '11-1', '1-13', '11-13' ]

  const positions = players.map(player => (
    [ player.id, initialPositions[player.id] ]
  ))

  return dispatch({
    type: GAME_START,
    data: { positions }
  })
}

export const changeColor = () => (dispatch, getState) => {
  const { welcome: { selected }, players, emojis } = getState()
  const keys = players.map(player => emojis.findKey(emoji => emoji === player.icon))
  const emoji = emojis.findKey(emoji => emoji === players.get(selected).icon)
  let nextEmoji = emoji + 1
  while (keys.includes(nextEmoji)) {
    nextEmoji++
  }

  return dispatch({
    type: GAME_PLAYER_CHANGE_COLOR,
    data: { id: selected, icon: emojis.get(nextEmoji) }
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

export const moveUp = () => (dispatch, getState) => {
  const { cells, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = cells.get(currentPosition).getNorth()

  if (cells.get(nextPosition) && cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const moveDown = () => (dispatch, getState) => {
  const { cells, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = cells.get(currentPosition).getSouth()

  if (cells.get(nextPosition) && cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const moveLeft = () => (dispatch, getState) => {
  const { cells, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = cells.get(currentPosition).getWest()

  if (cells.get(nextPosition) && cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const moveRight = () => (dispatch, getState) => {
  const { cells, positions } = getState()
  const currentPosition = positions.get(0)
  const nextPosition = cells.get(currentPosition).getEast()

  if (cells.get(nextPosition) && cells.get(nextPosition).get('type', null) === 'free') {
    return dispatch({
      type: PLAYER_MOVE,
      data: { id: 0, position: nextPosition }
    })
  }
}

export const dropBomb = () => (dispatch, getState) => {
  const { positions } = getState()
  const currentPosition = positions.get(0)

  return dispatch({
    type: BOMB_DROPED,
    data: { position: currentPosition, timestamp: Date.now() }
  })
}

export const selectPlayer = (id) => ({
  type: GAME_PLAYER_SELECTED,
  data: { id }
})
