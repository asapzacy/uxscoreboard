import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import routes from './config/routes'
import Perf from 'react-addons-perf'
require('dotenv').config()

const renderApp = (routes) => {
  render(
    <AppContainer>{routes}</AppContainer>,
    document.getElementById('app')
  )
}

renderApp(routes)

if (module.hot) {
  window.Perf = Perf
  module.hot.accept('./config/routes', () => {
    const newRoutes = require('./config/routes').default
    renderApp(newRoutes)
  })
}
