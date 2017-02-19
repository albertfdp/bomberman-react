import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import keycode from 'keycodes'
import { withRouter } from 'react-router-dom'
import { playerSelectors } from 'selectors'

import * as GameActions from 'actions/GameActions'
import PlayerSelector from './PlayerSelector'
import { Text, View } from 'components'

import styles from './styles.css'

const Arrow = ({ hasArrow }) => (
  <View className={styles.arrowContainer}>
    {
      hasArrow
      ? <View className={styles.arrow} />
      : null
    }
  </View>
)

class Welcome extends Component {
  static contexTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.node.focus()
  }

  renderPlayer = (player) => {
    const { selected } = this.props
    const isSelected = selected === player

    return (
      <View
        key={player}
        className={classnames(styles.row, { [styles.selected]: isSelected })}
      >
        <Arrow hasArrow={isSelected} />
        <PlayerSelector id={player} />
      </View>
    )
  }

  onKeyDown = (e) => {
    const { gameActions, push } = this.props

    switch (e.keyCode) {
      case keycode('up'):
        return gameActions.previousPlayer()
      case keycode('down'):
        return gameActions.nextPlayer()
      case keycode('left'):
      case keycode('right'):
        return gameActions.changeType()
      case keycode('c'):
        return gameActions.changeColor()
      case keycode('enter'):
        return push('/game')
      default:
        break
    }
  }

  render () {
    const { players } = this.props

    return (
      <View
        className={styles.container}
        onKeyDown={this.onKeyDown}
        ref={(ref) => { ref && (this.node = ref.node) }}
        tabIndex={0}
      >
        <View className={styles.content}>
          <View className={styles.selector}>
            {players.map(this.renderPlayer)}
          </View>
        </View>
        <View className={styles.help}>
          <View>
            <Text className={styles.key}>C</Text>
            <Text>&nbsp;to change character</Text>
          </View>
          <View>
            <Text className={styles.key}>ENTER</Text>
            <Text>&nbsp;to start</Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { welcome: { selected } } = state
  const { ids } = playerSelectors(state)

  return {
    selected,
    players: ids
  }
}

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(GameActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Welcome))
