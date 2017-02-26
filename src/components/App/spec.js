import React from 'react'
import expect from 'test/expect'

import { App } from '.'

const noop = () => {}

describe('App', () => {
  it('renders', () => {
    expect(<App dispatch={noop} />, 'to match snapshot')
  })
})
