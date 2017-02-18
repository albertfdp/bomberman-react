import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'

import React, { Component } from 'react'
import TestUtils from 'react-addons-test-utils'
import TestRenderer from 'react-test-renderer'

const jestExpect = global.expect

class StatelessWrapper extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render () {
    return this.props.children
  }
}

const renderIntoDocument = (reactElement) => {
  let component = TestUtils.renderIntoDocument(reactElement)
  if (component) {
    return component
  }

  return TestUtils.renderIntoDocument(
    <StatelessWrapper>{ reactElement }</StatelessWrapper>
  )
}

module.exports = unexpected
  .clone()
  .use(unexpectedReact)
  .addAssertion('<ReactElement> to match snapshot', (expect, subject) => {
    const tree = TestRenderer.create(subject).toJSON()
    jestExpect(tree).toMatchSnapshot()
  })
  .addAssertion('<ReactElement> when rendered <assertion>', (expect, subject) => {
    expect.errorMode = 'bubble'
    const renderer = TestUtils.createRenderer()
    renderer.render(subject)
    return expect.shift(renderer)
  })
  .addAssertion('<ReactElement> when deeply rendered <assertion>', (
    expect,
    subject
  ) => {
    expect.errorMode = 'bubble'
    return expect.shift(renderIntoDocument(subject))
  })
  .addAssertion(
    '<ReactElement> to render [exactly] [with all children] as <ReactElement>',
    (expect, subject, value) => {
      expect.errorMode = 'bubble'
      const renderer = TestUtils.createRenderer()
      renderer.render(subject)
      return expect(
        renderer,
        'to have [exactly] rendered [with all children] ',
        value
      )
    }
  )
  .addAssertion(
    '<ReactElement> to deeply render [exactly] [with all children] as <ReactElement>',
    (expect, subject, value) => {
      expect.errorMode = 'bubble'
      return expect(
        renderIntoDocument(subject),
        'to have [exactly] rendered [with all children] ',
        value
      )
    }
  )
  .addAssertion('<ReactElement> [not] to contain <ReactElement>', (
    expect,
    subject,
    value
  ) => {
    return expect(renderIntoDocument(subject), '[not] to contain', value)
  })
