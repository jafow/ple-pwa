var css = require('sheetify')
var choo = require('choo')
var express = require('express')
var server = express()
var bodyParser = require('body-parser')

server.use(bodyParser.urlencoded({extended: true}))
css('tachyons')
css('./assets/styles/header-bkground.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
}
// app.use(require('choo-service-worker')())

app.route('/', require('./views/main'))
app.route('/posted', function (data) {
  console.log('data!')
  console.log(data)
  return '<body><h1>hi</h1></body>'
})
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
