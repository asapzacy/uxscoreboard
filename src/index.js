import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer as HotLoader } from 'react-hot-loader'
require('dotenv').config()

import { AppContainer } from 'containers'

const renderApp = Component => {
  render(
    <Router>
      <HotLoader>
        <Component />
      </HotLoader>
    </Router>,
    document.getElementById('app')
  )
}

renderApp(AppContainer)

if (module.hot) {
  module.hot.accept('containers', () => {
    renderApp(AppContainer)
  })
}

if (__DEV__) {
  document.title = `dev -- ${document.title}`
  window.toJSON = str => '\n' + JSON.stringify(str, null, 2) + '\n'
  window.toHTML = obj => Object.keys(obj).forEach(key => <h1>{`${key}: ${obj[key]}`}</h1>)
}
