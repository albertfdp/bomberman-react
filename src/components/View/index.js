import React, { Component } from 'react'

export default class View extends Component {
  render () {
    const {
      children,
      ...props
    } = this.props

    return (
      <div {...props} ref={node => { this.node = node }}>
        { children }
      </div>
    )
  }
}
