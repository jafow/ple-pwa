var html = require('choo/html')
var ranges = {
  weight: {
    start: 33.0,
    end: 36.6
  },
  arm: {
    start: 16.25,
    end: 19.0
  },
  abdomen: {
    start: 48.50,
    end: 54.0
  },
  foot: {
    start: 14,
    end: 15.5
  }
}

var checkboxItems = ['rutin', 'rapamune', 'sildenafil', 'vomit', 'grumpy', 'rash', 'swelling:face', 'sick:cold', 'sick:stomach', 'wrapping']
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
        <form>
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
          <fieldset>
            <legend>Options</legend>
            ${checkboxItems.map(item =>
              html`
              <div>
                <input id=${item} type="checkbox" name="options" value=${item}/>
                <label for=${item}>${item}</label>
              </div>`)
            }
          </fieldset>
          <textarea id="notes"></textarea>
          <label for="notes">Notes</label>
        </form>
      </section>
    </body>
  `
}

function foo () {
  console.log('clicked')
}

function makeRange (start, end) {
  var res = []
  var split = start.toFixed(2).split('.').map(v => Number(v))
  var tens = split[0]
  var decimal = split[1] || 0

  while (tens + (decimal/100) < end) {
    if (decimal + 25 >= 100) {
      decimal = 0
      tens++
    } else {
      decimal+=25
    }
    res.push(tens + (decimal/100))
  }
  return res
}

function getLastWeight () {
  // get the last recorded weight
  return 34.6
}
