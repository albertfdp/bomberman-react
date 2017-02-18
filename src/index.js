import React from 'react'
import { render } from 'react-dom'

import { App } from 'components'
import 'styles/index.css'

import 'utils/offlinePlugin'

render(<App />, document.querySelector('.app'))
