import { Record } from 'immutable'

class Player extends Record({
  id: undefined,
  name: '',
  type: undefined,
  color: undefined,
  selected: false
}) { }

export default Player
