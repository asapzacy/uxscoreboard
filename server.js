#!/usr/bin/env node
const express = require('express')
const path = require('path')
const compression = require('compression')
const proxy = require('http-proxy-middleware')
const port = process.env.PORT || 9090
const app = express()

app.use(compression())
app.use(express.static('dist'))
app.use('/mlb', proxy({ target: 'http://gd2.mlb.com', changeOrigin: true }))
app.get('*', function(req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})
app.listen(port, function() {
  console.log(`server listen on port ${port}`)
})

module.exports = app
