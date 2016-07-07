import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { MainContainer, HomeContainer, MlbContainer,
  ScoreboardContainer } from 'containers'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='/mlb' component={MlbContainer}>
        <IndexRoute component={ScoreboardContainer} />
        <Route path='scores' component={ScoreboardContainer} />
      </Route>
      <Route path='/nba' component={HomeContainer} />
      <Route path='/nfl' component={HomeContainer} />
      <Route path='/about' component={HomeContainer} />
    </Route>
  </Router>
)

export default routes
