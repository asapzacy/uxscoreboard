
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

## Structure

- [server.js](./server.js): Node.js / Express server. Pretty simple; basically just serves a static `bundle.js` file using `app.use(express.static('dist'))`. This is running on `localhost:9090` and uses [nodemon](https://github.com/remy/nodemon) in development. I am currently in the process of moving all 3rd party API calls (source of all the game data) from the frontend to the backend, located at `localhost:9090/api`. Before, I was using a cheap *hack* to get around the CORS issue of HTTP --> HTTPS by proxying all requests through `https://cors-anywhere.herokuapp.com/`. It did (and does) work, but I'd like to move all requests to my own and am currently halfway through this process.

- [`/dist`](./dist): all the production files. `/assets` contains all static files including: `/css`, `/icons`, `/img`, `/js`, and `/other`. Webpack builds out the `index.html`, `app.css`, and `bundle.js` files when running `yarn build`, along with `webpack_stats.html` + `webpack_stats.json` (these files aren't pushed to git, but can be viewed at `localhost:8080/webpack_stats.html`).

- [`/app`](./app): everything else is here, all the development code.

  - [`/containers`]('./app/containers'): all of your _stateful_ containers; these include:
    - all the lifecycle methods
    - initialize and update any state
    - pass down state / methods / props to their functional component counterparts


  - [`/components`](./app/components): all of your _stateless_ presentational components; functional and pure components that take in props and output JSX / HTML. This is the bulk of the project. Each component has its' own CSS module for styling. I recently upgraded the project to use .scss syntax. Therefore, (using `<Game />` as an example) each component is comprised of a  `Game.js` and a `Game.scss` file. Also, the compiled syntax per CSS module follows this format - `Game__item___2ZbBG` (i.e. `Component__className___hash`).

  - [`/config`](./app/config): any config data -
    - [`routes.js`](./app/config/routes.js) - I use React Router (v3) and this exports a 'routes' object of different containers to be displayed per route.
    - [`analytics.js`](./app/config/analytics.js) - Google Analytics
    - [`firebase.js`](./app/config/firebase.js) - Google firebase
    - [`metadata.js`](./app/config/metadata.js) - update `<head></head>` metadata per page (in the process of upgrading to [react-helmet](https://github.com/nfl/react-helmet))
    - [`velocity.js`](./app/config/velocity.js) - animation settings


  - [`/data`](./app/data): any static data -
    - [`app_pages.js`](./app/data/app_pages.js) - navigation / page info
    - [`league_dates`](./app/data/league_dates.js) - league season dates to check for various parts of the season - (i.e. `isPreSeason`, `isSeason`, `isAllStar`, `isPlayoffs`, `isFinals`)
    - [`stadiums.js`](./app/data/stadiums.js) - no removed, but I was in the process of integrating [MapBox](https://www.mapbox.com/) to visualize a day of games across a map of America using stadium geolocation
    - [`team_colors.js`](./app/data/team_colors.js) - team color data for all 120+ teams - most hex values and SVG logos came from [teamcolors](https://github.com/jimniels/teamcolors)


  - [`/helpers`](./app/helpers): any helper files. the most important ones -
    - [`api.js`](./app/helpers/api.js) - all API calls to backend `localhost:9090/api`
    - [`utils.js`](./app/helpers/utils.js) - various utility functions, mostly having to do with formatting of dates using the moment.js package


  - [`/styles`](./app/styles): any shared styles -
    - [`_variables.scss`](./app/styles/_variables.scss) - sass variables for colors and media queries
    - [`_elements.scss`](./app/styles/_elements.scss) - reusable HTML elements
    - [`_utils.scss`](./app/styles/_utils.scss) - reusable classes
    - [`shared.css`](./app/styles/shared.css) - same as `_utils.scss` but with media queries

## Packages
Mentioned above briefly but he's a rundown of the most important packages I use.

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
