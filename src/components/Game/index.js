import React, { Component } from 'react'
import { PauseMenu, Scoreboard, View } from 'components'
import keycodes from 'keycodes'

import styles from './styles.css'

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
          Board
        </View>
        <PauseMenu
          paused={paused}
          onClose={this.onContinue}
        />
      </View>
    )
  }
}

export default Game
