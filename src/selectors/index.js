import { createSelector } from 'reselect'

const getPlayers = (state) => state.players

export const playerSelectors = createSelector(
  [ getPlayers ],
  (players) => ({
    ids: players.map(player => player.id)
  })
)
