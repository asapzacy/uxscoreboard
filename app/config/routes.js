import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { MainContainer, HomeContainer, AboutContainer, MlbContainer,
  ScoreboardContainer, StandingsContainer } from 'containers'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='/mlb' component={MlbContainer}>
        <Route path='scores'>
          <IndexRoute component={ScoreboardContainer} />
          <Route path=":date" component={ScoreboardContainer} />
        </Route>
        <Route path='standings'>
          <IndexRoute component={StandingsContainer} />
          <Route path=":filter" component={StandingsContainer} />
        </Route>
      </Route>
      <Route path='/about' component={AboutContainer} />
    </Route>
  </Router>
)

export default routes
