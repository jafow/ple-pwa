const css = require('sheetify')
const choo = require('choo')

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

module.exports = app
if (!module.parent) app.mount('body')
else module.exports = app
