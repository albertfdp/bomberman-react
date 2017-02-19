import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { PauseMenu, Scoreboard, View } from 'components'
import keycodes from 'keycodes'

import styles from './styles.css'

const Cell = ({ children, type }) => (
  <View
    className={classnames(styles.cell, styles[`type-${type}`])}>
    { children }
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
    this.node.focus()
  }

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case keycodes('esc'):
        this.setState(prevState => ({ paused: !prevState.paused }))
        break
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
              <Cell key={cell.id} type={cell.type}>
                { cell.id }
              </Cell>
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
  const { board: { cells } } = state

  return {
    cells
  }
}
export default connect(mapStateToProps)(Game)
