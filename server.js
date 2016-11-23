#!/usr/bin/env node
const express = require('express')
const path = require('path')
const compression = require('compression')
const port = process.env.PORT || 9090
const app = express()

app.use(compression())
app.use(express.static(__dirname, 'dist'))
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', '/index.html'))
})
app.listen(port, function() {
  console.log(`server listen on port ${port}`)
})

module.exports = app
