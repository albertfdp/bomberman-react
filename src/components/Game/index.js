import React, { Component } from 'react'
import { View } from 'components'

import styles from './styles.css'

class Game extends Component {
  render () {
    return (
      <View className={styles.container}>
        This is the Game container component
      </View>
    )
  }
}

export default Game
