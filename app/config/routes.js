import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { MainContainer, HomeContainer, MlbContainer, NflContainer,
  AboutContainer } from 'containers'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='/mlb'>
        <IndexRoute component={MlbContainer} />
        <Route path='scores' component={MlbContainer} />
        <Route path='scores/:date' component={MlbContainer} />
      </Route>
      <Route path='/about' component={AboutContainer} />
    </Route>
  </Router>
)

export default routes
