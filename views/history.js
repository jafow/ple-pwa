var html = require('choo/html')

module.exports = history

function history (state, emit) {
  let entries = state.history.map(entry =>
    html`<div>
      ${entry.date}
      <ul>
        <li>Weight: ${entry.weight}</li>
        <li>Arm: ${entry.arm}</li>
        <li>Abdomen: ${entry.abdomen}</li>
        <li>Foot: ${entry.foot}</li>
        <li>Poo: ${entry.poo}</li>
      </ul>
      <p>Notes: ${entry.notes}</p>
      <p>${entry.options ? 'Other: ' + entry.options.join(',') : ''}</p>
    </div>`)

  return html`
    <header class="w-100 bg-light-green h3">
      <h3 class="f3 pa3-m pa4-ns mh6 mt0 cf fr">PLE Stats</h3>
      <nav>
      <ul class="mv0">
        <li><a href="/update">Edit</a></li>
        <li><a href="/delete">Delete</a></li>
        <li><a href="/history">History</a></li>
      </ul>
      </nav>
    </header>
    <body>
      <h1>History</h1>
      <a href="/">Home</a>
      <a href="/update">Update</a>
      <a href="/history">History</a>
      <section>
      <div>
        ${entries}
      </div>
      </section>
    </body>
  `
}
