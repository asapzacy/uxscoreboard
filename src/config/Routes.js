import React from 'react'
import { Route, Switch } from 'react-router-dom'

const MlbContainer = React.lazy(() =>
  import(/* webpackChunkName: "mlb" */ '../containers/Mlb/MlbContainer')
)
const NbaContainer = React.lazy(() =>
  import(/* webpackChunkName: "nba" */ '../containers/Nba/NbaContainer')
)
const NhlContainer = React.lazy(() =>
  import(/* webpackChunkName: "nhl" */ '../containers/Nhl/NhlContainer')
)
const NflContainer = React.lazy(() =>
  import(/* webpackChunkName: "nfl" */ '../containers/Nfl/NflContainer')
)
const AboutContainer = React.lazy(() =>
  import(/* webpackChunkName: "about" */ '../containers/About/AboutContainer')
)
const HomeContainer = React.lazy(() =>
  import(/* webpackChunkName: "home" */ '../containers/Home/HomeContainer')
)
const NotFoundContainer = React.lazy(() =>
  import(
    /* webpackChunkName: "404" */ '../containers/NotFound/NotFoundContainer'
  )
)
const TestContainer = React.lazy(() =>
  import(/* webpackChunkName: "test" */ '../containers/Test/TestContainer')
)

const Routes = () => (
  <Switch>
    <Route exact={true} path={'/'} component={HomeContainer} />
    <Route exact={true} path={'/mlb'} component={MlbContainer} />
    <Route exact={true} path={'/mlb/scores'} component={MlbContainer} />
    <Route path={'/mlb/scores/:date'} component={MlbContainer} />
    <Route exact={true} path={'/nba'} component={NbaContainer} />
    <Route exact={true} path={'/nba/scores'} component={NbaContainer} />
    <Route path={'/nba/scores/:date'} component={NbaContainer} />
    <Route exact={true} path={'/nfl'} component={NflContainer} />
    <Route exact={true} path={'/nfl/scores'} component={NflContainer} />
    <Route path={'/nfl/scores/:week'} component={NflContainer} />
    <Route exact={true} path={'/nhl'} component={NhlContainer} />
    <Route exact={true} path={'/nhl/scores'} component={NhlContainer} />
    <Route path={'/nhl/scores/:date'} component={NhlContainer} />
    <Route path={'/about'} component={AboutContainer} />
    {__DEV__ && <Route path={'/test'} component={TestContainer} />}
    <Route path={'*'} component={NotFoundContainer} />
  </Switch>
)

export default Routes
