var html = require('choo/html')

module.exports = posted

function posted (state, emit) {
  if (!state.parsed) return
  var { date, weight, arm, abdomen, foot, poo } = state.parsed

  var opts = state.parsed.options.length > 0
    ? html`<div class="mh3">
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
      <header class="w-100 bg-dark-green h3 shadow-4">
        <h3 class="f3 w-60 ma0 mt3 cf fr white">PLE Stats</h3>
        <nav class="pa3">
            <div class="cf fl mt2 ml1 nav-hamburger"><span></span></div>
            <ul id="list" class="list ph0 hide">
              <li><a href="/">Home</a></li>
              <li><a href="/history">History</a></li>
            </ul>
        </nav>
      </header>
      <script>
        document.getElementsByTagName('nav')[0].addEventListener('click', function (e) {
          var list = document.getElementById('list')
          var oldClass = list.getAttribute('class')
          // toggle class
          if (/expand/.test(oldClass)) {
            list.setAttribute('class', oldClass.replace('expand', 'hide'))
          } else {
            list.setAttribute('class', oldClass.replace('hide', 'expand'))
          }
        })
      </script>
      <section>
        <h1>This has been saved:</h1>
        <div>
          <ul class="list pa4">
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
      <div>
      </div>
    </body>
  `
}
