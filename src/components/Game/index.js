import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { PauseMenu, Scoreboard, Text, VirtualBoard, View } from 'components'
import keycodes from 'keycodes'

import * as GameActions from 'actions/GameActions'

import styles from './styles.css'

const Cell = ({ id, type }) => (
  <View
    className={classnames(styles.cell, styles[`type-${type}`])}>
    {
      (type === 'bomb')
        ? <Text className={styles.object}>💣</Text>
        : __DEV__ ? <Text>{ id }</Text> : null
    }
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
    const { gameActions, push } = this.props

    switch (e.keyCode) {
      case keycodes('esc'):
        return push('/')
      case keycodes('up'):
        return gameActions.moveUp()
      case keycodes('down'):
        return gameActions.moveDown()
      case keycodes('left'):
        return gameActions.moveLeft()
      case keycodes('right'):
        return gameActions.moveRight()
      case keycodes('a'):
        return gameActions.dropBomb()
      default:
        return
    }
  }

  onContinue = () => {
    this.setState({ paused: false })
  }

  render () {
    const { paused } = this.state
    const { cells } = this.props

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
                id={cell.id}
                type={cell.type}
              />
            )) }
            <VirtualBoard />
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

const mapStateToProps = ({ cells }) => ({ cells })

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(GameActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game))
