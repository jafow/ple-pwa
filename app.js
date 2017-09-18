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
app.route('/dist/*', require('./views/main'))
app.route('/', require('./views/main'))
app.route('/posted', require('./views/posted'))
app.route('/history', require('./views/history'))
app.use(function toggleNav (state, emitter) {
  state.navOpen = false;
  emitter.on('toggleNav', function (navState) {
    console.log('toggled ', navState)
    state.navOpen = navState
  })
})

module.exports = app
if (!module.parent) app.mount('body')
else module.exports = app
