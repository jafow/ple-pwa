var html = require('choo/html')
var css = require('sheetify')
var headerBkground = css('./../assets/styles/header-bkground.css')

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
  var armRange = makeRange(ranges.arm.start, ranges.arm.end)
  var abRange = makeRange(ranges.abdomen.start, ranges.abdomen.end)
  var footRange = makeRange(ranges.foot.start, ranges.foot.end)
  var lastWeight = getLastWeight()
  return html`
    <body>
      <style>
        ${
            html`header {
            /* height: 120px; */
            width: 100%;
            background-color: #DFDBE5;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23054c18' fill-opacity='0.38'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
          }
          body {
            color: rose;
            font-family: 'avenir next', avenir, sans-serif;
          }`
        }
      </style>
      <header>
        <nav>
        <ul class="nav-menu">
          <li><a href="/update">Edit</a></li>
          <li><a href="/delete">Delete</a></li>
          <li><a href="/history">History</a></li>
        </ul> 
        </nav>
        <h3 class="f1 pa3-m pa4-ns">PLE Stats</h3>
      </header>
      <section>
        <form action="/posted" method="post">
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
          <div class="pa3">
            <label class="f6 b db mb2" for="notes">Notes</label>
            <textarea class="bl border-box hover-black w-100 measure pa2 br2 mb2" id="notes" autocomplete></textarea>
          </div>
          <button type="submit">Save</button>
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
