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
      <h1>This has been saved:</h1>
      <a href="/">Home</a>
      <a href="/update">Update</a>
      <a href="/history">History</a>
      <section>
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
