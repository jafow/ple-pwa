var html = require('choo/html')
var ranges = {
  weight: {
    start: 33.0,
    end: 36.6
  },
  arm: {
    start: 15.2,
    end: 20.9
  },
  abdomen: {
    start: 49.5,
    end: 54.9
  },
  foot: {
    start: 15.2,
    end: 16.9
  }
}
module.exports = view

function view (state, emit) {
  // if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  let newState = Object.assign({}, state)
  newState.label = 'weight'
  var armRange = makeRange(ranges.arm.start, ranges.arm.end)
  var abRange = makeRange(ranges.abdomen.start, ranges.abdomen.end)
  var footRange = makeRange(ranges.foot.start, ranges.foot.end)
  var lastWeight = getLastWeight()
  return html`
    <body class="sans-serif">
      <header>
        <nav>
        <ul class="nav-menu">
          <li><a href="/update">Update</a></li>
          <li><a href="/delete">Delete</a></li>
        </ul> 
        </nav>
        <h3 class="f1 pa3-m pa4-ns">PLE Stats</h3>
      </header>
      <section>
        <p>
          <label>Weight</label>
          <input type="number" placeholder=${String(lastWeight)} value=${lastWeight} />
        </p>
        <p>
          <label>Arm Size</label>
          <select>
            ${armRange.map(v => html`<option value=String(${v})>${v}</option>`)}
          </select>
        </p>
        <p>
          <label>Abdomen Size</label>
          <select>
            ${abRange.map(v => html`<option value=String(${v})>${v}</option>`)}
          </select>
        </p>
        <p>
          <label>Foot Size</label>
          <select>
            ${footRange.map(v => html`<option value=String(${v})>${v}</option>`)}
          </select>
        </p>
      </section>
      <footer>
      </footer>
    </body>
  `
}

function foo () {
  console.log('clicked')
}

function makeRange (start, end) {
  var res = []
  var split = String(start).split('.').map(v => Number(v))
  var tens = split[0]
  var decimal = split[1] || 0

  while (tens + (decimal/100) < end) {
    res.push(tens + (decimal/100))
    if (decimal + 1 === 10) {
      decimal = 0
      tens++
    } else {
      decimal++
    }
  }
  return res
}

function getLastWeight () {
  // get the last recorded weight
  return 34.6
}
