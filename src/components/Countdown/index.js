import React, { Component } from 'react'
import { Text, View } from 'components'

import styles from './styles.css'

export default class CountDown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      endTime: new Date().getTime() + (2 * 60 * 1000),
      minutes: 2,
      seconds: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    const { paused: prevPaused } = this.props
    const { paused } = nextProps
    const { endTime } = this.state

    if (prevPaused && !paused) {
      console.log(endTime)
    }
  }

  componentDidMount () {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick = () => {
    const { endTime } = this.state
    const { paused, onStop } = this.props

    if (paused) { return }

    const diff = new Date(endTime - new Date())

    const minutes = diff.getMinutes()
    const seconds = diff.getSeconds()

    if (minutes === 0 && seconds === 0) {
      clearInterval(this.timer)
      onStop && onStop()
    }

    this.setState({
      minutes: diff.getMinutes(),
      seconds: diff.getSeconds()
    })
  }

  displayTime (unit) {
    if (unit < 10) { return `0${unit}` }
    if (unit === 60) { return '00' }
    return unit
  }

  render () {
    const { minutes, seconds } = this.state

    return (
      <View className={styles.countdown}>
        <Text className={styles.time}>
          { `${this.displayTime(minutes)}:${this.displayTime(seconds)}` }
        </Text>
      </View>
    )
  }

}
