import { Record } from 'immutable'

class Player extends Record({
  id: undefined,
  name: '',
  type: undefined,
  selected: false,
  score: 0,
  icon: undefined
}) { }

export default Player
