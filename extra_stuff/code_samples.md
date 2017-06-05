
# uxscoreboard

![uxscoreboard preview](https://raw.githubusercontent.com/zacarellano/uxscoreboard/master/dist/assets/other/uxscoreboard_preview.png)

uxscoreboard | A sports scoreboard web app built on ES6 and React.js—features all MLB, NBA, NFL, NHL, and MLS (coming soon) games.


## Usage
```
git clone https://github.com/zacarellano/uxscoreboard.git
cd uxscoreboard
yarn
yarn start
```
then --> [localhost:8080](http://localhost:8080)

## Code Samples
I'll walk through two files - one being a stateful container and the other a presentational component.

### 1. [`MlbContainer.js`](../app/containers/Mlb/MlbContainer.js) - container component
This container covers everything MLB (each league has it's own container, where they fetch data, parse it, save it, and feed it down to children components). Here's a brief list of how this container works..

![MlbContainer preview](https://raw.githubusercontent.com/zacarellano/uxscoreboard/master/dist/assets/other/MlbContainer_preview.png)


1.  `<MlbContainer />` is created and the `constructor()` sets initial state like so -
    ```
    this.state = {
      isLoading: true,
      isValid: false,
      isError: false,
      scores: {},
      cache: {},
      year: '',
      date: '',
      today: ''
    }
    ```

2. On `componentDidMount()`, mainly two things happen -

    a.) updates `this.state.today` to the actual day in the format `20170604` and then makes a call to `this.makeRequest()` sending it `this.props.routeParams.date`. If there is no `this.props.routeParams.date` (i.e. first time a user enters the site), then `this.makeRequest()` will use today's date, else it will use whatever date is in the url (`https://uxscoreboard/mlb/scores/20170606`).
    ```
    componentDidMount() {
      this.setState({ today: getTodaysDate() }, () => {
        this.makeRequest(this.props.routeParams.date)
        this.getCache()
      })
    }
    ```

    b.) calls `this.getCache()` which syncs with firebase and saves the MLB portion of my firebase data to `this.state.cache`. I do this in order to minimize requests to firebase, instead of calling it every time I need something, it's stored in the `this.state.cache` object.
    ```
    getCache() {
      ref.once('value', (snapshot) => {
        if (snapshot.hasChild('mlb')) {
          this.setState({
            cache: snapshot.val().mlb.scores
          })
        }
      })
    }
    ```

3. `this.makeRequest()` is called which fetches the scores data. This makes a call to `getMlbScores()`, which in turn calls <code>\`localhost:9090/api/mlb/scores/${date}\`</code> on the backend. The Node.js server makes a request to the actual MLB API and receives a JSON file, then parses it, and sends the data back to the frontend. From here, `this.state.scores` is updated with the current scores array, `this.state.year` is updated to the current season year of the scores returned (i.e. `2016`), and a call to `this.delay()` is made.
```
makeRequest(dt = this.state.today) {
  if (isValidDate(dt)) {
    this.setState({ isValid: true })
  }
  getMlbScores(dt)
    .then((currentScores) => {
      const games = currentScores.dates[0].games
      this.setState({
        scores: games,
        year: games[0].season,
        date: dt
      }, () => this.delay())
    })
    .catch((error) =>  {
      this.setState({
        isLoading: false,
        isError: true,
        date: dt
      })
      throw new Error(error)
    })
    .then(() => this.refreshScores(dt, 30))
    .then(() => this.saveScores())
}
```

4. `this.delay()` creates a _fake sense of loading_. In 960ms, `this.state.isLoading` will be set to false. I should mention, when `isLoading` is set to `true` (initially), a `<Loading />` component is showed, then when `isLoading` is updated to `false`, the actual `<League />` component is shown which mainly includes a `<Date />` component (date navigation at top) and a `<Scoreboard />` component (where all the games can be found).. if the request doesn't go through and `isError` is set to true, an `<Error />` component is shown.
```
delay() {
  if (this.state.isLoading) {
    this.delayId = setTimeout(() => {
      this.setState({ isLoading: false })
    }, 960)
  }
}
```

5. After `this.delay()` is called, two more processes happen -

    a.) `this.refreshScores()` is called, which creates a timeout (default is 30s), and will continually call `this.makeRequest()` every 30 seconds to update the scores.
    ```
    refreshScores(dt, seconds) {
      clearTimeout(this.refreshId)
      this.refreshId = setTimeout(() => this.makeRequest(dt), seconds * 1000)
    }
    ```

    b.) `this.saveScores()` is called, which will save the new updated `this.state.scores` object to Firebase.
    ```
    saveScores() {
      ref.child(`mlb/scores/${this.state.date}`)
        .set(this.state.scores)
        .then(() => console.log(`mlb scores updated.. `))
        .then(() => this.getCache())
    }
    ```

  6. One last thing, the whole web app mainly relies on [React Router v3](https://github.com/ReactTraining/react-router/tree/v3/docs) and using `this.props.routeParams.date`, so.. whenever this prop (url) gets updated, now `<MlbContainer />` knows it's a new date and needs to fetch the new scores accordingly.
  ```
  componentWillReceiveProps(nextProps) {
    clearTimeout(this.refreshId)
    this.makeRequest(nextProps.routeParams.date)
  }
  ```


### 2. [`Team.js`](../app/components/Team/Team.js) - presentational component
This is one of the most-used components in the project.

![Team preview](https://raw.githubusercontent.com/zacarellano/uxscoreboard/master/dist/assets/other/Team_preview.png)


1. Every `<Game />` consists of two `<Team />`s  and every `<Team />` has the following characteristics (passed in as props):
    - `name` - team name (i.e. `Giants`)
    - `code` - 2-3 letter team code (i.e. `sfg`)
    - `filetype` - In one case I have 2 .png logos, everything else is SVG (i.e. `svg`)
    - `ws` - team wins (i.e. `100`)
    - `ls` - team losses (i.e. `99`)
    - `ts` - team ties, only NHL / NFL have ties (i.e. `1`)
    - `score` - team score **if the game has started** (i.e. `55`)
    - `league` - to locate the path of the logo (i.e. `mlb`)

2. All-in-all, this what the code looks like:

*note - the New York Yankees have a custom styling / css class that creates pinstripes, so it's a little annoying, but I manually have to check each team to set its' `className` and `background-image` accordingly.*
```
const createBgImage = (code, league) => ({
  backgroundImage:code !== 'nyy' && `linear-gradient(to right,${team_colors[league][code]} 40%,transparent 0%)`
})

const Team = ({ name, code, filetype = 'svg', ws, ls, ts, score, league }) => (
  <section className={code === 'nyy' ? s[code] : s.container} style={createBgImage(code, league)}>
    <img className={s.logo} src={`/assets/img/${league}/teams/${code}.${filetype}`} alt={`${name} Logo | uxscoreboard`} />
    <main className={s.info}>
      <section className={s.leftSide}>
        <span className={s.name}>{ name.length >= 9 ? <small>{name}</small> : name }</span>
        { (ws && ls) &&
          <span className={s.record}>{`(${ws}-${ls}${ts ? `-${ts}` : ''})`}</span>
        }
      </section>
      <section className={s.rightSide}>
        { score &&
          <span className={s.score}>{score}</span>
        }
      </section>
    </main>
  </section>
)
```
