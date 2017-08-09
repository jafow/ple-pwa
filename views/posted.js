var html = require('choo/html')
var css = require('sheetify')

module.exports = posted

function posted (state, emit) {
  console.log('state is ', state)
  return html`
  <body>
    <h1> posted here </h1>
    <div> ${state.date}</div>
    <div>${state.weight}</div>
  </body>
  `
}
