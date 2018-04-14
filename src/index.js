import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as ReactRouter } from 'react-router-dom'
import { AppContainer as ReactHotLoader } from 'react-hot-loader'

import { AppContainer } from 'containers'

const renderApp = Component => {
  render(
    <ReactRouter>
      <ReactHotLoader>
        <Component />
      </ReactHotLoader>
    </ReactRouter>,
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
