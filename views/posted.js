var html = require('choo/html')

module.exports = posted

function posted (state, emit) {
  let { date, weight, arm, abdomen, foot } = state.parsed
  return html`
  <body>
    <h1>This has been saved:</h1>
    <a href="/">Home</a>
    <a href="/update">Update</a>
    <a href="/history">History</a>
    <section>
      <ul>
        <li>Date: ${date}<li>
        <li>Weight: ${weight}</li>
        <li>Arm Size: ${arm}</li>
        <li>Abdomen Size: ${abdomen}</li>
        <li>Foot Size: ${foot}</li>
      </ul>
      <div>
        ${
          (state.parsed.options.length > 0)
          ? html`<p> options: </p>
            <p>${state.parsed.options.join(',')}</p>`
          : ''
        }
        <p>Notes: </p>
        <p>${state.parsed.notes}</p>
      </div>
    </section>
  </body>
  `
}
