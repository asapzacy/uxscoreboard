import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { MainContainer as Root } from 'containers'

require('dotenv').config()

const renderApp = Root => {
  render(
    <AppContainer>
      <Router>
        <Root />
      </Router>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp(Root)

if (module.hot) {
  document.head.querySelector('link[rel=icon]').href = '/favicon-dev.png'
  module.hot.accept('containers/Main/MainContainer', () => {
    const Root = require('containers/Main/MainContainer').default
    renderApp(Root)
  })
}
