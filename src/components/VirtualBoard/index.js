import React, { Component } from 'react'
import { Text, View } from 'components'
import { connect } from 'react-redux'

import styles from './styles.css'

const getStyleFromPosition = (position) => {
  if (!position) { return {} }

  const HEIGHT = 62
  const WIDTH = 62
  const CELLS_PER_ROW = 15

  const top = (Math.floor(position / CELLS_PER_ROW) * HEIGHT)
  const left = ((Math.floor(position % CELLS_PER_ROW)) * WIDTH)

  return { top, left }
}

const VirtualPlayer = ({ id, icon, position }) => (
  <View className={styles.player} style={getStyleFromPosition(position)}>
    <Text className={styles.icon}>
      { icon }
    </Text>
  </View>
)

class VirtualBoard extends Component {
  render () {
    const { players, positions } = this.props

    return (
      <View className={styles.container}>
        <View className={styles.relative}>
          { players.valueSeq().map(player => (
            <VirtualPlayer
              key={player.id}
              id={player.id}
              icon={player.icon}
              position={positions.get(player.id)}
            />
          ))}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ players, positions }) => ({ players, positions })

export default connect(mapStateToProps)(VirtualBoard)
