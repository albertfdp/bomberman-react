import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Welcome, View } from 'components'

import styles from './styles.css'

const App = () => (
  <View className={styles.container}>
    <h3>hello</h3>
    <Router>
      <Route exact path='/' component={Welcome} />
    </Router>
  </View>
)

export default App
