#!/usr/bin/env node
const express = require('express')
const path = require('path')
const port = process.env.PORT || 4545

const app = express()
app.use(express.static('./dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'))
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

module.exports = app
