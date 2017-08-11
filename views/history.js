var html = require('choo/html')

module.exports = history

function history (state, emit) {
  console.log('stsate history ', state.history)

  let entries = state.history.map(entry =>
    html`<div>
      ${Date.parse(entry.date)}
      <ul>
        <li>${entry.weight || ''}</li>
        <li>${entry.notes || '' }</li>
      <ul>
    </div>`)

  return html`
  <body>
    <h1>History</h1>
    <a href="/">Home</a>
    <a href="/update">Update</a>
    <a href="/history">History</a>
    <section>
      <h2>${state.success} hello </h2>
    <div>
      ${ entries }
    </div>
    </section>
  </body>
  `
}
