import React from 'react'

export default ({ children, ...props }) => (
  <span {...props}>
    { children }
  </span>
)
