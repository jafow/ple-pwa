const css = require('sheetify')
const choo = require('choo')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const DbController = require('./lib/setup-db')
const dbCtrl = DbController('v1.sql')
const stateCtrl = require('./lib/state-ctrl')

server.use(bodyParser.urlencoded({extended: true}))
css('tachyons')
css('./assets/styles/header-bkground.css')

const app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
}
app.use(require('choo-service-worker')())
app.route('/', require('./views/main'))
app.route('/posted', require('./views/posted'))
app.route('/history', require('./views/history'))

/* server 
 */
server.get('/', (req, res) => {
    res.send(app.toString('/', {}))
})

server.post('/posted', dbCtrl.run, stateCtrl.format, (req,  res) => {
  res.send(app.toString('/posted', { parsed: req.body.parsedState }))
})

server.get('/history', dbCtrl.get, stateCtrl.hist, (req, res) => {
  let { success, mappedHistory } = req.body
  res.send(app.toString('/history', { success:success, history: mappedHistory }))
})

server.listen(3000)

module.exports = app
