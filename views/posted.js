var html = require('choo/html')

module.exports = posted

function posted (state, emit) {
  var { date, weight, arm, abdomen, foot, poo } = state.parsed

  var opts = state.parsed.options.length > 0
    ? html`<div>
            <h4>options: </h4>
            <p>${state.parsed.options.join(',')}</p>
          </div>`
    : ''

  var notes = state.parsed.notes
    ? html`<div>
            <h4> Notes: </h4>
            <p>${state.parsed.notes}</p>
          </div>`
    : ''

  return html`
    <body>
      <header class="w-100 bg-light-green h3 shadow-4">
        <h3 class="f3 pa3-m pa4-ns mh6 mt0 cf fr">PLE Stats</h3>
        <nav class="pa3">
          <a href="#" class="cf fl ml1 mt2 nav-hamburger"><span></span></a>
          <ul class="mv0 hide">
            <li><a href="/history">History</a></li>
          </ul>
        </nav>
      </header>
      <section>
        <h1>This has been saved:</h1>
        <div>
          <ul>
            <li>Date: ${date}</li>
            <li>Weight: ${weight}</li>
            <li>Arm Size: ${arm}</li>
            <li>Abdomen Size: ${abdomen}</li>
            <li>Foot Size: ${foot}</li>
            <li>Poo: ${poo}</li>
          </ul>
        </div>
        ${opts}
        ${notes}
      </section>
    </body>
  `
}
