import axios from 'axios'

const cors = 'https://crossorigin.me/'


const params = {
  proxy: {
   host: '127.0.0.1',
   port: 9090
 },
 headers: {
   'Access-Control-Allow-Origin': '*',
   'http-equiv': 'Content-Security-Policy',
   'content': 'upgrade-insecure-requests'
 }
}
// axios request - mlb scores
export const getMlbScores = (dt) => {
  const yyyy = dt.slice(0,4)
  const mm = dt.slice(4,6)
  const dd = dt.slice(6,dt.length)
  const url = `http://gd2.mlb.com/components/game/mlb/year_${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
  return axios.get(url)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}

// axios request - nhl scores
export const getNhlScores = (dt) => {
  const yyyy = dt.slice(0,4)
  const mm = dt.slice(4,6)
  const dd = dt.slice(6,dt.length)
  const url = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yyyy}-${mm}-${dd}&endDate=${yyyy}-${mm}-${dd}&expand=schedule.teams,schedule.linescore,schedule.scoringplays,schedule.game.seriesSummary`
  return axios.get(url)
    .then(currentScores => currentScores.data, params)
    .catch(currentScores => currentScores.status)
}









var nba_config = {
  headers: { 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json, text/plain, */*'}
}
export function getNbaScores(dt) {
  if (dt === undefined || dt > 20160619 && dt < 20160930)
    dt = '20161025'
  const url = `http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${dt}/games.json`
  return axios.get(url)
    .then(currentScores => currentScores.data.leagues_content.games, nba_config)
    .catch(currentScores => currentScores.status)
}

export function getNbaGameDetails(dt, id) {
  // const url = `${cors}http://data.nba.com/data/10s/json/cms/noseason/game/${dt}/${id}/boxscore.json`
  const url = `http://data.nba.com/data/10s/json/cms/noseason/game/${dt}/${id}/boxscore.json`
  return axios.get(url)
    .then(gameDetails => gameDetails.data.leagues_content.game)
    .catch(gameDetails => gameDetails.status)
}

var epl_config = {
  headers: {
    'Origin': 'https://www.premierleague.com',
    'Referer': 'https://www.premierleague.com',
    'Host': 'premierleague.com'
  }
}
export function getNflScores() {
  const url = 'https://footballapi.pulselive.com/football/teams?page=0&pageSize=100&altIds=true&compSeasons=42'
  // const url = 'https://footballapi.pulselive.com/football/fixtures?comps=1&compSeasons=54&page=0&pageSize=40&sort=desc&statuses=C&altIds=true'
  return axios.get(url, epl_config)
    .then((currentScores) => console.log(currentScores.headers))
    .catch((currentScores) => console.log(currentScores.headers))
}
