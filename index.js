const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const DbController = require('./lib/setup-db')
const dbCtrl = DbController('v1.sql')
const stateCtrl = require('./lib/state-ctrl')
const app = require('./app.js')
const path = require('path')

server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, 'dist')))

server.post('/posted', dbCtrl.run, stateCtrl.format, (req, res) => {
  res.send(app.toString('/posted', { parsed: req.body.parsedState }))
})

server.get('/history', dbCtrl.get, stateCtrl.hist, (req, res) => {
  let { history } = req.body
  res.send(app.toString('/history', {history}))
})

server.listen(3000)
