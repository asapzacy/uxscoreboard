#!/usr/bin/env node
const express = require('express')
const compression = require('compression')
const port = process.env.PORT || 8080
const app = express()

app.get('/', function(req,res) {
  res.send('hello world')
})

app.listen(port, function() {
  console.log(`server listen on port ${port}`)
})

module.exports = app
