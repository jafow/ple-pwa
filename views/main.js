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
    start: 49.50,
    end: 54.0
  },
  foot: {
    start: 14.5,
    end: 16.5
  }
}

var checkboxItems = ['rutin', 'rapamune', 'sildenafil', 'vomit', 'grumpy', 'rash', 'swelling:face', 'sick:cold', 'sick:stomach', 'wrapping']
module.exports = view

function view (state, emit) {
  var armRange = makeRange(ranges.arm.start, ranges.arm.end)
  var abRange = makeRange(ranges.abdomen.start, ranges.abdomen.end)
  var footRange = makeRange(ranges.foot.start, ranges.foot.end)
  var lastWeight = getLastWeight()
  return html`
    <body>
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
            <label for="date">Date</label>
            <input type="date" id="date" name="date" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
          </p>
          <p>
            <label>Weight</label>
            <input type="number" name="weight" step="0.2" placeholder=${String(lastWeight)} value=${lastWeight} />
          </p>
          <p>
            <label>Arm Size</label>
            <select name="arm">
              ${armRange.map(v => html`<option value=${v}>${v}</option>`)}
            </select>
          </p>
          <p>
            <label>Abdomen Size</label>
            <select name="abdomen">
              ${abRange.map(v => html`<option value=${v}>${v}</option>`)}
            </select>
          </p>
          <p>
            <label>Foot Size</label>
            <select name="foot">
              ${footRange.map(v => html`<option value=${v}>${v}</option>`)}
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
            <textarea class="bl border-box hover-black w-100 measure pa2 br2 mb2" name="notes" id="notes" autocomplete></textarea>
          </div>
          <input type="submit" value="Save" />
        </form>
      </section>
    <script src="dist/bundle.js" type="application/javascript"></script>
    </body>
  `
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
