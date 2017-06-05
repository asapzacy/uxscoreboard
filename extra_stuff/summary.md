
# uxscoreboard

![uxscoreboard preview](https://raw.githubusercontent.com/zacarellano/uxscoreboard/master/dist/assets/other/uxscoreboard_preview.png)

uxscoreboard | A sports scoreboard web app built on ES6 and React.js—features all MLB, NBA, NFL, NHL, and MLS (coming soon) games.

## Directory
  - [Usage](#usage)
  - [Overview](#overview)
  - [Code Sample](#code-sample)
  - [Packages](#packages)
  - [Going Forward](#going-forward)

## Usage
```
git clone https://github.com/zacarellano/uxscoreboard.git
cd uxscoreboard
yarn
yarn start
```
then --> [localhost:8080](http://localhost:8080)

## Overview
This is how the project is set-up for the most part.

- [server.js](./server.js): Node.js / Express server - pretty simple; basically just serves a static `bundle.js` file using `app.use(express.static('dist'))`. This is running on `localhost:9090` and uses [nodemon](https://github.com/remy/nodemon) in development. I am currently in the process of moving all 3rd party API calls (source of game scores) from the frontend to the backend, located at `localhost:9090/api`. Before, I was using a cheap *hack* to get around the CORS issue of HTTP --> HTTPS by proxying all requests through `https://cors-anywhere.herokuapp.com/`. It works, but I'd like to move all requests on my own server.

- [`/dist`](./dist): production files - `/assets` contains all static files including: `/css`, `/icons`, `/img`, `/js`, and `/other`. Webpack builds out the `index.html`, `app.css`, and `bundle.js` files when running `yarn build`, along with `webpack_stats.html` + `webpack_stats.json` (these files aren't pushed to git, but can be viewed at `localhost:8080/webpack_stats.html`).

- [`/app`](./app): development code -

  - [`/containers`]('./app/containers'): all of the _stateful_ containers; each container component includes:
    - lifecycle methods
    - initialize and update any state
    - bind methods and pass down to children components
    - pass down state / props to children as well


  - [`/components`](./app/components): all of the _stateless_ presentational components; functional and pure components that take in props and output JSX / HTML. This is the bulk of the project. Each component has its' own CSS module for styling. I recently upgraded the project to use .scss syntax. Therefore, (using `<Game />` as an example) each component is a directory comprised of:
    - `Game.js` - takes in props --> outputs HTML
    - `Game.scss` - CSS modules that get compiled into this format -
      - `Game__item___2ZbBG`
      - i.e. `Component__className___hash`


  - [`/config`](./app/config): config files -
    - [`routes.js`](./app/config/routes.js) - I use React Router (v3) and export an object of different containers to be displayed per route
    - [`analytics.js`](./app/config/analytics.js) - Google Analytics config
    - [`firebase.js`](./app/config/firebase.js) - Google Firebase config
    - [`metadata.js`](./app/config/metadata.js) - update `<head></head>` metadata per page (in the process of upgrading to [react-helmet](https://github.com/nfl/react-helmet))
    - [`velocity.js`](./app/config/velocity.js) - animation settings


  - [`/data`](./app/data): data files -
    - [`app_pages.js`](./app/data/app_pages.js) - navigation / page info
    - [`league_dates`](./app/data/league_dates.js) - season dates for each league to check for various parts of the season -
      - `isPreseason`
      - `isSeason`
      - `isAllStar`
      - `isPlayoffs`
      - `isFinals`
    - [`stadiums.js`](./app/data/stadiums.js) - (now removed) I was in the process of integrating [MapBox](https://www.mapbox.com/) to visualize a day of games across a map of America using stadium geolocation
    - [`team_colors.js`](./app/data/team_colors.js) - hex colors for all 120+ teams (most hex values / SVG logos came from [teamcolors](https://github.com/jimniels/teamcolors))


  - [`/helpers`](./app/helpers): helper files, the most important ones are -
    - [`api.js`](./app/helpers/api.js) - all API calls to backend `localhost:9090/api`
    - [`utils.js`](./app/helpers/utils.js) - various utility functions, mostly having to do with formatting of dates using the moment.js package


  - [`/styles`](./app/styles): shared styles -
    - [`_variables.scss`](./app/styles/_variables.scss) - sass variables
    - [`_elements.scss`](./app/styles/_elements.scss) - styling for HTML elements
    - [`_utils.scss`](./app/styles/_utils.scss) - styling for class utilities


## Code Sample
I'll walk through two files - one being a stateful container, the other a presentational component.

### [`MlbContainer.js`](./app/container/MlbContainer.js) - container component
This container covers everything MLB (each league has it's own container, where they fetch data, parse it, save it, and feed it down to a `<League />` child). Here's a brief list of how this container works..

1.  `<MlbContainer />` is created, and sets its' initial state like so -
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
  a. calls `this.makeRequest()` using today's date in the format `20170604`
  b. calls `this.getCache()` which syncs with firebase and saves the MLB portion of my firebase data to `this.state.cache`. I do this in order to minimize requests to firebase, instead of calling it every time I need something.

3. `this.makeRequest()` is called which fetches our scores data. This makes a call to `getMlbScores()`, which in turn calls <code>\`localhost:9090/api/mlb/scores/${date}\`</code> on the backend. The Node.js server makes a request to the actual MLB API and receives a JSON file, then parses it, and sends the data back to the frontend. From here, `this.state.scores` is updated with the current scores array, `this.state.year` is updated to the current season year of the scores returned (i.e. `2016`), and a call to `this.delay()` is made.

4. `this.delay()` creates a fake _sense_ of data actually loading. In 960ms, `this.state.isLoading` is set to false. I should mention, when `isLoading` is set to `true` (initially), a `<Loading />` component is showed, when `isLoading` is changed to `false`, the `{...this.state}` is passed down to a `<League />` component which later handles the data and passes down to other children.

5. After `this.delay()` is called, two more processes happen -
  a. `this.refreshScores()` is called, which creates a timeout (default is 30s), and will continually call `this.makeRequest()` every 30 seconds to update the scores.
  b. `this.saveScores()` is called , which will save the new `this.state.scores` object to Firebase.


### [`Team.js`](./app/components/Team.js) - presentational component
This is one of the main, and most-used, components of the project. Every `<Game />` component consists of two `<Team />` components. Every `<Team />` takes in the following props:
  - `name` - team name (i.e. 'Giants')
  - `code` - 2-3 letter team code (i.e. 'sfg')
  - `filetype` - I used SVGs for everything I can, in one case (MLB All-Star game) I could only locate .png files (i.e. 'svg')
  - `ws` - team wins (i.e. '100')
  - `ls` - team lossess (i.e. '99')
  - `ts` - team ties, only NHL / NFL have ties (i.e. '1')
  - `scores` - team score if the game has started (i.e. '55')
  - `league` - to locate directory for the logo (i.e. 'mlb')

All-in-all, this what the code looks like:

** note - the New York Yankees have a custom styling / css class that creates pinstripes, so it's a little annoying, but I manually have to check each team to set its' `className` and `background-image` accordingly. *

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


## Packages
Here's a rundown of all the packages I use.

### development
- [webpack 2](https://webpack.js.org/) - pretty much does everything listed below - I have one webpack file ([weback.config.babel.js]('./webpack-config/babel.js')) which handles both development and production builds
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server) & [react-hot-loader](https://github.com/gaearon/react-hot-loader) - automatic (and quick) page updates
- [babel](https://babeljs.io/) - use all ES6/ES7 features including stage-0 stuff (file itself - [`.babelrc`](.babelrc))
- [svgo](https://github.com/svg/svgo) - I can run `yarn images` from the command line and this package will find and compress every .svg file
- [browser-sync](https://github.com/Va1/browser-sync-webpack-plugin) - if I need to test on other devices and use devtools (located at `localhost:8081`)
- [webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer & [webpack-stats-plugin](https://github.com/FormidableLabs/webpack-stats-plugin) - to build out a webpack stats visualizer and can be viewed at `localhost:8080/webpack_stats.html` (need to run `yarn build` first). This package has saved me a tremendous amout of bytes and nearly cut my `bundle.js` size in half.
- [postCSS](https://github.com/postcss) / [autoprefixer](https://github.com/postcss/autoprefixer) - to add vendor prefixes in my build `app.css` file
- [style-loader](https://github.com/webpack-contrib/style-loader) + [css-loader](https://github.com/webpack-contrib/css-loader) - to be able use CSS modules
- [sass-loader](https://github.com/webpack-contrib/sass-loader) + [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) + [node-sass](https://github.com/sass/node-sass) - to be able to use .scss syntax and compile it to .css syntax
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) - just started using this. Before, I was loading my CSS modules into `bundle.js` which was causing Flash-Of-Unstyled-Content due to JavaScript being single-threaded and having to parse the entire 700kb file before displaying any style. Now I extract all my CSS modules into one `app.css` file which is loaded in parallel with `bundle.js` and creates a much better first impression on initial page load.


### frontend
- [react](https://facebook.github.io/react/) & [react-dom](https://facebook.github.io/react/docs/react-dom.html) - react is awesome.
- [react-router (v3)](https://github.com/ReactTraining/react-router/tree/v3/docs) - haven't upgraded to v4 yet, but handles all the routing / single-page app stuff
- [axios](https://github.com/mzabriskie/axios) - promise-based HTTP client, use it both on the frontend / React and backend / Node
- [moment](https://github.com/moment/moment/) & [moment-timezone](https://github.com/moment/moment-timezone/) - I deal with a lot of dates and moving forward / backward days to display different games and this package has helped a lot (little big on the size though)
- [velocity-react](https://github.com/twitter-fabric/velocity-react) - animations in React have always felt very awkward - Twitter's Velocity animation library has made it a lot easier (and very performant / 60fps).
- [firebase](https://github.com/firebase/firebase-js-sdk) - have mixed feelings on this, but for now am using Google's realtime database - Firebase.
- [react-icons](https://github.com/gorangajic/react-icons) - great package that provides a ton of svg icons that you can import using ES6 syntax (I mainly use [IonIcons](http://ionicons.com/)).
- [react-ga](https://github.com/react-ga/react-ga) - Google Analytics module for React - handles all the routing / single-page-application analytics pretty well.
- [xml2js](https://github.com/vavere/xml2js-parser) - the NFL API sends back a .xml file, use this to parse it into a JavaScript object.
- [webfontloader](https://github.com/typekit/webfontloader) - to avoid FOUT when requesting fonts from Google Fonts

### backend
- [express](https://github.com/expressjs/express) - web server for Node.js
- [compression](https://github.com/expressjs/compression) - for gzip compression on the server
- [cors](https://github.com/expressjs/cors) - allows my backend `http://localhost:9090/api` to talk with my `https://uxscoreboard.com` site (no HTTP / HTTPS problems sending / receiving data)
