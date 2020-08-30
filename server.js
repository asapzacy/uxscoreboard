#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const express = require('express')
const https = require('https')
const compression = require('compression')
const cors = require('cors')
const responseTime = require('response-time')
const axios = require('axios')
const parseString = require('xml2js').parseString

require('dotenv').config()

const API_HOST = process.env.API_HOST || 'local.api.uxscoreboard'
const API_PORT = process.env.API_PORT || 9999

const app = express()

app.use(compression())
app.use(cors())
app.use(responseTime())

app.use(express.static('./dist'))

const parseDate = dt => {
  const yyyy = dt.slice(0, 4)
  const mm = dt.slice(4, 6)
  const dd = dt.slice(6, dt.length)
  return { yyyy, mm, dd }
}

app.get('/api/mlb/scores/:dt', (req, res) => {
  const { yyyy, mm, dd } = parseDate(req.params.dt)
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${mm}/${dd}/${yyyy}&sortBy=gameDate&hydrate=linescore(runners),flags,team,review`
  return axios
    .get(url)
    .then(scores => res.send(scores.data))
    .catch(error => res.send(error.status))
})

app.get('/api/nba/scores/:dt', (req, res) => {
  const { dt } = req.params
  const gamesUrl = `http://data.nba.net/prod/v2/${dt}/scoreboard.json`
  const teamsUrl = `https://data.nba.net/prod/v2/2019/teams.json`

  return axios
    .all([axios.get(gamesUrl), axios.get(teamsUrl)])
    .then(
      axios.spread((games, teams) => {
        const nbaTeams = teams.data.league.standard.filter(
          team => team.isNBAFranchise === true
        )
        const scores = {}
        scores.year = dt.slice(0, 4)
        scores.games = games.data.games

        scores.games.forEach(game => {
          game.vTeam = {
            ...game.vTeam,
            ...nbaTeams.find(team => team.teamId === game.vTeam.teamId)
          }
          game.hTeam = {
            ...game.hTeam,
            ...nbaTeams.find(team => team.teamId === game.hTeam.teamId)
          }
        })

        res.send(scores)
      })
    )
    .catch(error => res.send(error.status))
})

app.get('/api/nba/scores/:dt/details/:id', (req, res) => {
  const { dt, id } = req.params
  const url = `http://data.nba.com/prod/v1/${dt}/${id}_boxscore.json`
  return axios
    .get(url)
    .then(scores => res.send(scores.data))
    .catch(error => res.send(error.status))
})

app.get('/api/nfl/scores/week/:week', (req, res) => {
  const { week } = req.params
  const url = `https://www.nfl.com/ajax/scorestrip?season=2017&seasonType=REG&week=${week}`
  return axios
    .get(url)
    .then(scores => {
      parseString(scores.data, (err, result) => {
        const scores = {}
        scores.year = result.ss.gms[0].$.y
        scores.games = result.ss.gms[0].g.reduce((arr, el, i) => {
          arr.push(el.$)
          return arr
        }, [])
        res.send(scores)
      })
    })
    .catch(error => res.send(error.status))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'))
})

const localApp = https.createServer(
  {
    key: fs.readFileSync(`./.ssl/${API_HOST}.key`),
    cert: fs.readFileSync(`./.ssl/${API_HOST}.cert`),
    requestCert: false,
    rejectUnauthorized: false
  },
  app
)

const server = process.env.NODE_ENV === 'development' ? localApp : app
server.listen(API_PORT, () => {
  /* eslint-disable */
  console.log(`server listening on port ${API_PORT}`)
})
