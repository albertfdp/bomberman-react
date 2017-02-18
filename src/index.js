import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { App, DevTools } from 'components'
import 'styles/index.css'

import store from 'stores'

import 'utils/offlinePlugin'

render(
  <Provider store={store}>
    <DevTools>
      <App />
    </DevTools>
  </Provider>,
  document.querySelector('.app')
)
