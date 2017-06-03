#!/usr/bin/env node
const express = require('express')
const path = require('path')
const compression = require('compression')
const cors = require('cors')
const axios = require('axios')
const port = process.env.PORT || 9090

const app = express()
app.use(compression())
app.use(cors())
app.use(express.static('dist'))

app.get('/api/mlb/scores/:dt', (req, res) => {
  const { dt } = req.params
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${dt.slice(4,6)}/${dt.slice(6,dt.length)}/${dt.slice(0,4)}&sortBy=gameDate&hydrate=linescore(runners),flags,team,review`
  return axios.get(url)
    .then(scores => res.send(scores.data))
    .catch(error => res.send(error.status))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'))
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

module.exports = app
