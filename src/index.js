import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import routes from './config/routes'

require('dotenv').config()

const renderApp = routes => {
  render(<AppContainer>{routes}</AppContainer>, document.getElementById('app'))
}

renderApp(routes)

if (module.hot) {
  document.head.querySelector('link[rel=icon]').href = '/favicon-dev.png'
  module.hot.accept('./config/routes', () => {
    const newRoutes = require('./config/routes').default
    renderApp(newRoutes)
  })
}
