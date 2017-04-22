#!/usr/bin/env node
const express = require('express')
const path = require('path')
const compression = require('compression')
const port = process.env.PORT || 9090
const app = express()

app.use(compression())
app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'))
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

module.exports = app
