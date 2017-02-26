import { Record, List } from 'immutable'

class Bomb extends Record({
  position: undefined,
  blast: new List(),
  timestamp: undefined
}) {
  get id () {
    return this.position
  }
}

export default Bomb
