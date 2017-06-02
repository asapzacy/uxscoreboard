import axios from 'axios'
import { dateObject } from './utils'

const CORS = 'https://cors-anywhere.herokuapp.com/'

// axios request - mlb scores
export const getMlbScores = (dt) => {
  const { yyyy, mm, dd } = dateObject(dt)
  const api = `${CORS}https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${mm}/${dd}/${yyyy}&sortBy=gameDate&hydrate=linescore(runners),flags,team,review`
  return axios.get(api)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}

export const getMlbGameDetails = (id) => {
  const api = `r`
}

// axios request - nba scores
export const getNbaScores = (dt) => {
  const api = `${CORS}http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${dt}/games.json`
  const api2 = `${CORS}http://data.nba.net/data/10s/prod/v2/${dt}/scoreboard.json`
  return axios.all([axios.get(api), axios.get(api2)])
    .then(axios.spread((details, standings) => Object.assign({}, details.data, standings.data)))
    .catch(currentScores => currentScores.status)
}

// axios request - nba game details
export const getNbaGameDetails = (dt, id) => {
  const api = `${CORS}http://data.nba.com/data/10s/json/cms/noseason/game/${dt}/${id}/boxscore.json`
  return axios.get(api)
    .then(gameDetails => gameDetails.data)
    .catch(gameDetails => gameDetails.status)
}


export const getNflScores2 = () => {
  const api = `http://www.nfl.com/liveupdate/scores/scores.json`
  return axios.get(api)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}

// axios request - nfl scores
export const getNflScores = (dt) => {
  const api = `${CORS}https://www.nfl.com/ajax/scorestrip?season=2017&seasonType=REG&week=1`
  return axios.get(api)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}

// axios request - nhl scores
export const getNhlScores = (dt) => {
  const { yyyy, mm, dd } = dateObject(dt)
  const api = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yyyy}-${mm}-${dd}&endDate=${yyyy}-${mm}-${dd}&expand=schedule.teams,schedule.linescore,schedule.scoringplays,schedule.game.seriesSummary,seriesSummary.series`
  return axios.get(api)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}
