import React from 'react'
import expect from 'test/expect'

import App from '.'

describe('App', () => {
  it('renders', () => {
    expect(<App />, 'to match snapshot')
  })

  it('renders with', () => {
    expect(
      <App />,
      'to render as',
      <div className='container'>
        <h1>An opinionated boilerplate</h1>
        <p>...and offline ready!</p>
      </div>
    )
  })
})
