import React, { Component } from 'react'
import { Text, View } from 'components'
import { connect } from 'react-redux'
import { CELL_HEIGHT, CELL_WIDTH } from 'constants'

import styles from './styles.css'

const getStyleFromPosition = (position) => {
  if (!position) { return {} }
  const [ row, column ] = position.split('-')

  return {
    top: Math.floor(row * CELL_HEIGHT),
    left: Math.floor(column * CELL_WIDTH)
  }
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
