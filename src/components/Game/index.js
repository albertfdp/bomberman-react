import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PauseMenu, Scoreboard, Text, View } from 'components'
import keycodes from 'keycodes'

import * as GameActions from 'actions/GameActions'

import styles from './styles.css'

const Cell = ({ type, player }) => (
  <View
    className={classnames(styles.cell, styles[`type-${type}`])}>
    <Text className={styles.icon}>
      { player && player.icon }
    </Text>
  </View>
)

class Game extends Component {
  constructor (props) {
    super(props)

    this.state = {
      paused: false
    }
  }

  componentDidMount () {
    const { gameActions } = this.props

    this.node.focus()
    gameActions.startGame()
  }

  onKeyDown = (e) => {
    const { gameActions } = this.props

    switch (e.keyCode) {
      case keycodes('esc'):
        this.setState(prevState => ({ paused: !prevState.paused }))
        break
      case keycodes('up'):
        return gameActions.moveUp()
      case keycodes('down'):
        return gameActions.moveDown()
      case keycodes('left'):
        return gameActions.moveLeft()
      case keycodes('right'):
        return gameActions.moveRight()
      default:
        return
    }
  }

  onContinue = () => {
    this.setState({ paused: false })
  }

  render () {
    const { paused } = this.state
    const { cells, positions, occupied, players } = this.props

    return (
      <View
        className={styles.container}
        onKeyDown={this.onKeyDown}
        ref={(ref) => { ref && (this.node = ref.node) }}
        tabIndex={0}
      >
        <View className={styles.topbar}>
          <Scoreboard paused={paused} />
        </View>
        <View className={styles.board}>
          <View className={styles.cells}>
            { cells.valueSeq().map(cell => (
              <Cell
                key={cell.id}
                type={cell.type}
                player={occupied.includes(cell.id) && players.get(positions.findKey(pos => pos === cell.id))}
              />
            )) }
          </View>
        </View>
        <PauseMenu
          paused={paused}
          onClose={this.onContinue}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { board: { cells }, positions, players } = state

  return {
    cells,
    positions,
    occupied: positions.valueSeq(),
    players
  }
}

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(GameActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
