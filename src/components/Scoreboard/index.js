import React from 'react'
import { connect } from 'react-redux'
import { playerSelectors } from 'selectors'
import { Countdown, View } from 'components'

import styles from './styles.css'

const Score = ({ score }) => (
  <View className={styles.score}>
    { score }
  </View>
)

const PlayerScore = ({ id, icon, score }) => (
  <View className={styles.playerScore}>
    <View className={styles.player}>
      { icon }
    </View>
    <Score score={score} />
  </View>
)

const Scoreboard = ({ scores, paused }) => {
  const playerScores = scores.map(player => (
    <PlayerScore
      key={player.id}
      id={player.id}
      icon={player.icon}
      score={player.score}
    />
  ))

  return (
    <View className={styles.container}>
      { playerScores.slice(0, 2) }
      <Countdown paused={paused} />
      { playerScores.slice(2, 4) }
    </View>
  )
}

const mapStateToProps = (state) => {
  const { scores } = playerSelectors(state)
  return {
    scores
  }
}

export default connect(mapStateToProps)(Scoreboard)
