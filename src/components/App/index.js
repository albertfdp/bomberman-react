import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Game, Welcome, View } from 'components'

import styles from './styles.css'

const App = () => (
  <Router>
    <View className={styles.container}>
      <Route path='/game' component={Game} />
      <Route exact path='/' component={Welcome} />
    </View>
  </Router>
)

export default App
