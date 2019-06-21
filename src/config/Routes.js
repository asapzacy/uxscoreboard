import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  HomeContainer,
  MlbContainer,
  NbaContainer,
  NflContainer,
  NhlContainer,
  AboutContainer,
  NotFoundContainer,
  TestContainer
} from 'containers'

const Routes = () => (
  <Switch>
    <Route exact path={'/'} component={HomeContainer} />
    <Route exact path={'/mlb'} component={MlbContainer} />
    <Route exact path={'/mlb/scores'} component={MlbContainer} />
    <Route path={'/mlb/scores/:date'} component={MlbContainer} />
    <Route exact path={'/nba'} component={NbaContainer} />
    <Route exact path={'/nba/scores'} component={NbaContainer} />
    <Route path={'/nba/scores/:date'} component={NbaContainer} />
    <Route exact path={'/nfl'} component={NflContainer} />
    <Route exact path={'/nfl/scores'} component={NflContainer} />
    <Route path={'/nfl/scores/:week'} component={NflContainer} />
    <Route exact path={'/nhl'} component={NhlContainer} />
    <Route exact path={'/nhl/scores'} component={NhlContainer} />
    <Route path={'/nhl/scores/:date'} component={NhlContainer} />
    <Route path={'/about'} component={AboutContainer} />
    <Route path={'/test'} component={TestContainer} />
    <Route path={'*'} component={NotFoundContainer} />
  </Switch>
)

export default Routes
