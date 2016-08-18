import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { MainContainer, HomeContainer, AboutContainer, MlbContainer,
  NflContainer, ScoreboardContainer, StandingsContainer, LeagueContainer } from 'containers'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='/mlb' component={MlbContainer}>
        <Route path='scores' component={ScoreboardContainer} />
        <Route path='scores/:date' component={ScoreboardContainer} />
        <Route path='standings' component={StandingsContainer} />
        <Route path='standings/:filter' component={StandingsContainer} />
      </Route>
      <Route path='/nfl' component={NflContainer}>
        <Route path='scores' component={ScoreboardContainer} />
        <Route path='scores/:date' component={ScoreboardContainer} />
      </Route>
      <Route path='/about' component={AboutContainer} />
    </Route>
  </Router>
)

export default routes
