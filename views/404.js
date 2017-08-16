var html = require('choo/html')

var TITLE = 'route not found'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body class="sans-serif">
      <h1 class="f1 pa3 pa4-ns">
        404 - route not found
      </h1>
      <a href="/" class="link black underline">
        Back to main
      </a>
    </body>
  `
}
