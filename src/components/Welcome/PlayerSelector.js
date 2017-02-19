import React from 'react'
import { connect } from 'react-redux'
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

const mapStateToProps = ({ players }, { id }) => ({
  player: players.find(player => player.id === id)
})

export default connect(mapStateToProps)(PlayerSelector)
