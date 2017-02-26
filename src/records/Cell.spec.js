import expect from 'test/expect'

import { ROWS, COLUMNS } from 'constants'
import Cell from './Cell'

describe('Cell', () => {
  describe('getNorth', () => {
    it('handles top-most cell', () => {
      const cell = new Cell({ row: 0, column: 0 })

      expect(cell.getNorth(), 'to equal', null)
    })

    it('handles other cells', () => {
      const cell = new Cell({ row: 1, column: 1 })

      expect(cell.getNorth(), 'to equal', `0-1`)
    })
  })

  describe('getSouth', () => {
    it('handles bottom-most cell', () => {
      const cell = new Cell({ row: ROWS, column: COLUMNS })

      expect(cell.getSouth(), 'to equal', null)
    })

    it('handles other cells', () => {
      const cell = new Cell({ row: 0, column: 0 })

      expect(cell.getSouth(), 'to equal', `1-0`)
    })
  })
})
