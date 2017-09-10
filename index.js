const express = require('express')
const server = express()
const config = require('./config.js')()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const DbController = require('./lib/setup-db')
const dbCtrl = DbController('v1.sql')
const stateCtrl = require('./lib/state-ctrl')
const auth = require('./lib/auth')
const app = require('./app.js')
const path = require('path')
const validUser = config.validUser
const sign = config.cookieSign
const PORT = process.env.PORT || 8180

server.use(bodyParser.urlencoded({extended: true}))
server.use(cookieParser(sign))
server.disable('x-powered-by')
server.get('/', (req, res) => {
  if (req.signedCookies.validUser === validUser) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  } else {
    res.redirect('/login')
  }
})

server.get(/\/?dist\/\w?/, (req, res) => {
  if (req.signedCookies.validUser === validUser) {
    let file = req.url
    res.sendFile(path.join(__dirname, file))
  } else {
    res.send(app.toString('/404'))
  }
})

server.post('/login', auth, (req, res) => {
  if (req.body.validUser === validUser) {
    res.redirect('dist/index.html')
  } else {
    res.send('failed login post')
  }
})

server.get('/login', (req, res) => {
  if (req.signedCookies.validUser === validUser) {
    res.redirect('/dist')
  } else {
    res.sendFile(path.join(__dirname, 'login.html'))
  }
})

server.post('/posted', dbCtrl.run, stateCtrl.format, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
  res.send(app.toString('/posted', {parsed: req.body.parsedState}))
})

server.get('/history', dbCtrl.get, stateCtrl.hist, (req, res) => {
  let { history } = req.body
  res.send(app.toString('/history', {history}))
})

server.listen(PORT)
