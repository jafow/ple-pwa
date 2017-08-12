var html = require('choo/html')

module.exports = history

function history (state, emit) {
  console.log('stsate history ', state.history)

  const dateHelper = (ds) => {
    let d = new Date(ds).toISOString()
    return d.substr(0, d.indexOf('T'))
  }

  let entries = state.history.map(entry =>
    html`<div>
      ${dateHelper(entry.date)}
      <ul>
        <li>Weight: ${entry.weight || ''}</li>
        <li>Arm ${entry.arm || ''}</li>
        <li>Abdomen${entry.abdomen || ''}</li>
        <li>Foot ${entry.foot || '' }</li>
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
      ${entries}
    </div>
    </section>
  </body>
  `
}
