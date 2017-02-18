import React from 'react'
import classnames from 'classnames'
import { View, Text } from 'components'

import styles from './styles.css'

const PlayerSelector = ({ player }) => (
  <View
    className={styles.player}
  >
    <View className={styles.playerContent}>
      <View className={styles.icon} style={{ backgroundColor: player.color }} />
      <Text className={styles.name}>{ player.name }</Text>
    </View>
    <Text className={classnames(styles.type, styles[`type-${player.type}`])}>{ player.type }</Text>
  </View>
)

export default PlayerSelector
