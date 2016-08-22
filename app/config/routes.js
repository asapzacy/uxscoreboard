import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'
import { MainContainer, HomeContainer, MlbContainer, NbaContainer,
  NflContainer, NhlContainer, AboutContainer, NotFoundContainer } from 'containers'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='/mlb'>
        <IndexRoute component={MlbContainer} />
        <Route path='scores' component={MlbContainer} />
        <Route path='scores/:date' component={MlbContainer} />
      </Route>
      <Route path='/nba'>
        <IndexRoute component={NbaContainer} />
        <Route path='scores' component={NbaContainer} />
        <Route path='scores/:date' component={NbaContainer} />
      </Route>
      <Route path='/nfl'>
        <IndexRoute component={NflContainer} />
        <Route path='scores' component={NflContainer} />
        <Route path='scores/:week' component={NflContainer} />
      </Route>
      <Route path='/nhl'>
        <IndexRoute component={NhlContainer} />
        <Route path='scores' component={NhlContainer} />
        <Route path='scores/:date' component={NhlContainer} />
      </Route>
      <Route path='/about' component={AboutContainer} />
      <Route path='*' component={NotFoundContainer} />
    </Route>
  </Router>
)

export default routes
