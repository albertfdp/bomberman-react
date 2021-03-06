import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Game, Welcome, View } from 'components'

import { init } from 'actions/GameActions'

import styles from './styles.css'

export class App extends Component {
  componentWillMount () {
    const { dispatch } = this.props

    dispatch(init())
  }

  render () {
    return (
      <Router>
        <View className={styles.container}>
          <Route path='/game' component={Game} />
          <Route exact path='/' component={Welcome} />
        </View>
      </Router>
    )
  }
}

export default connect()(App)
