var html = require('choo/html')

module.exports = history

function history (state, emit) {
  let entries = state.history.map(entry =>
    html`<div>
      ${entry.date}
      <ul>
        <li>Weight: ${entry.weight}</li>
        <li>Arm ${entry.arm}</li>
        <li>Abdomen${entry.abdomen}</li>
        <li>Foot ${entry.foot}</li>
      <ul>
      <p>Notes: ${entry.notes}</p>
      <p>${entry.options ? 'other: ' + entry.options.join(',') : ''}</p>
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
      ${entries}
    </div>
    </section>
  </body>
  `
}
