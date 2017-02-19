import { Record, OrderedMap } from 'immutable'
import { Cell } from 'records'

class Board extends Record({
  cells: new OrderedMap()
}) {
  static create () {
    const cells = []

    for (let i = 1; i <= (15 * 13); i++) {
      const id = i - 1
      let type

      if ((id < 15) || (id > 179) || ((id + 1) % 15 === 0) || (id % 15 === 0)) {
        type = 'wall'
      } else if (
        ((id - 2) % 30 === 0) ||
        ((id - 4) % 30 === 0) ||
        ((id - 6) % 30 === 0) ||
        ((id - 8) % 30 === 0) ||
        ((id - 10) % 30 === 0) ||
        ((id - 12) % 30 === 0) ||
        ((id - 14) % 30 === 0)
      ) {
        type = 'wall'
      } else if ([ 16, 28, 166, 178 ].includes(id) || [ 17, 31, 151, 167, 27, 43, 177, 163 ].includes(id)) {
        type = 'free'
      } else {
        type = 'block'
      }

      cells.push(new Cell({ id: id, type }))
    }

    return new Board({
      cells: new OrderedMap(cells.map(cell => (
        [cell.id, cell]
      )))
    })
  }
}

export default Board
