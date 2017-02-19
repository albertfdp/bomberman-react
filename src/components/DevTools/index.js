import React from 'react'
import { View } from 'components'

import { createDevTools } from 'redux-devtools'

import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={false}
  >
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
)

const Wrapper = ({ children }) => (
  <View>
    { children }
    { __PRODUCTION__ ? null : <DevTools /> }
  </View>
)

export default Wrapper
