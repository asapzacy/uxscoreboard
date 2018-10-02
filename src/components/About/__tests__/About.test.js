import React from 'react'
import { shallow } from 'enzyme'

import About from '../About'

describe('About.js', () => {
  it('renders correctly', () => {
    expect(shallow(<About />)).toMatchSnapshot()
  })
})
