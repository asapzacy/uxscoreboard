import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import * as Sentry from '@sentry/browser'

import { MainContainer as Root } from 'containers'

require('dotenv').config()

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://66e8a28472ba439eabfa9cb013eaa1b4@sentry.io/1540454'
  })
}

const renderApp = Root => {
  render(
    <AppContainer>
      <Router>
        <React.Suspense fallback={<div />}>
          <Root />
        </React.Suspense>
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
