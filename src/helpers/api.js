import axios from 'axios'
import { dateObject } from './utils'

export const getMlbScores = dt => {
  const api = `/api/mlb/scores/${dt}`
  return axios
    .get(api)
    .then(scores => scores.data)
    .catch(error => error.status)
}

export const getNbaScores = dt => {
  const api = `/api/nba/scores/${dt}`
  return axios
    .get(api)
    .then(scores => scores.data)
    .catch(error => error.status)
}

export const getNbaGameDetails = (dt, id) => {
  const api = `/api/nba/scores/${dt}/details/${id}`
  return axios
    .get(api)
    .then(details => details.data)
    .catch(error => error.status)
}

export const getNflScores = week => {
  const api = `/api/nfl/scores/week/${week}`
  return axios
    .get(api)
    .then(scores => scores.data)
    .catch(error => error.status)
}

// axios request - nhl scores
export const getNhlScores = dt => {
  const { yyyy, mm, dd } = dateObject(dt)
  const api = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yyyy}-${mm}-${dd}&endDate=${yyyy}-${mm}-${dd}&expand=schedule.teams,schedule.linescore,schedule.scoringplays,schedule.game.seriesSummary,seriesSummary.series`
  return axios
    .get(api)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}
