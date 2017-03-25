import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { MainContainer, HomeContainer, MlbContainer, NbaContainer,
  NflContainer, NhlContainer, AboutContainer, NotFoundContainer,
  MapContainer, TestContainer } from 'containers'

const routes = (
  <Router history={browserHistory}>
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
        <Route path='map' component={MapContainer} />
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
      <Route path='/test' component={TestContainer} />
      <Route path='*' component={NotFoundContainer} />
    </Route>
  </Router>
)

export default routes
