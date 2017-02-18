import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import keycode from 'keycodes'
import { withRouter } from 'react-router-dom'

import * as GameActions from 'actions/GameActions'
import PlayerSelector from './PlayerSelector'
import { View } from 'components'

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

  componentWillMount () {
    const { gameActions } = this.props

    gameActions.start()
  }

  componentDidMount () {
    this.node.focus()
  }

  renderPlayer = (player) => {
    const { selected } = this.props
    const isSelected = selected === player.id

    return (
      <View
        key={player.id}
        className={classnames(styles.row, { [styles.selected]: isSelected })}
      >
        <Arrow hasArrow={isSelected} />
        <PlayerSelector player={player} />
      </View>
    )
  }

  onKeyDown = (e) => {
    const { gameActions, push } = this.props

    if (e.keyCode === keycode('up')) {
      gameActions.previousPlayer()
    } else if (e.keyCode === keycode('down')) {
      gameActions.nextPlayer()
    } else if (e.keyCode === keycode('left') || e.keyCode === keycode('right')) {
      gameActions.changeType()
    } else if (e.keyCode === keycode('c')) {
      gameActions.changeColor()
    } else if (e.keyCode === keycode('enter')) {
      push('/game')
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
      </View>
    )
  }
}

const mapStateToProps = ({ players, welcome }) => {
  return { players, selected: welcome.selected }
}
const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(GameActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Welcome))
