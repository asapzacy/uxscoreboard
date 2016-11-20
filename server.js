#!/usr/bin/env node
const express = require('express')
const compression = require('compression')
const port = process.env.PORT || 9090
const app = express()

app.use(compression())
app.use(express.static('dist'))
app.listen(port, function() {
  console.log(`server listen on port ${port}`)
})

module.exports = app
