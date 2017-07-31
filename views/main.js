var html = require('choo/html')

module.exports = view

function view (state, emit) {
  // if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  let newState = Object.assign({}, state)
  newState.label = 'weight'
  return html`
    <body class="sans-serif">
      <header>
        <nav>
        <ul class="nav-menu">
          <li><a href="/update">Update</a></li>
          <li><a href="/delete">Delete</a></li>
        </ul> 
        </nav>
        <h3 class="f-headline pa3 pa4-ns">PLE Stats</h3>
      </header>
      <section>
        <p><label>${newState.label}</label></p>
      </section>
      <footer>
      </footer>
    </body>
  `
}

function foo () {
  console.log('clicked')
}
