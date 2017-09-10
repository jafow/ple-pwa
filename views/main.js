var html = require('choo/html')
var dateHelper = require('../lib/date-helper.js')

var ranges = {
  weight: {
    start: 33.0,
    end: 36.6
  },
  arm: {
    start: 16.0,
    end: 19.0
  },
  abdomen: {
    start: 49.50,
    end: 54.0
  },
  foot: {
    start: 14.0,
    end: 16.5
  }
}

var checkboxItems = ['rutin', 'rapamune', 'sildenafil', 'vomit', 'grumpy', 'rash', 'swelling:face', 'sick:cold', 'sick:stomach', 'wrapping']
module.exports = view

function view (state, emit) {
  var armRange = makeRange(ranges.arm.start, ranges.arm.end, 25)
  var abRange = makeRange(ranges.abdomen.start, ranges.abdomen.end)
  var footRange = makeRange(ranges.foot.start, ranges.foot.end)
  var lastWeight = getLastWeight()
  var defaultDate = dateHelper(new Date())
  return html`
    <body class="avenir black bg-near-white">
      <header class="w-100 bg-light-green h3 shadow-4">
        <h3 class="f3 w-60 ma0 mt3 cf fr">PLE Stats</h3>
        <nav class="pa3">
        <a href="#" class="cf fl mt2 ml1 nav-hamburger"><span></span></a>
        <ul class="mv0 hide">
          <li><a href="/update">Edit</a></li>
          <li><a href="/delete">Delete</a></li>
          <li><a href="/history">History</a></li>
        </ul> 
        </nav>
      </header>
      <section class="ph3 pv0">
        <form class="post-form" action="/posted" method="post">
          <p>
            <label for="date">Date</label>
            <input type="date" id="date" name="date" placeholder=${defaultDate} value=${defaultDate} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
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
          <p>
            <label>Poo</label>
            <input type="number" name="poo" step="1" value="1" />
          </p>
          <fieldset class="nb">
            <legend>Options</legend>
            <div>
              ${checkboxItems.map(item =>
                html`
                <div class="fl w-50 pa1">
                  <input id=${item} type="checkbox" name="options" value=${item}/>
                  <label for=${item}>${item}</label>
                </div>`)
              }
            </div>
          </fieldset>
          <div class="pa3">
            <label class="f6 b db mb2" for="notes">Notes</label>
            <textarea class="bl border-box hover-black w-100 measure pa2 br2 mb2" name="notes" id="notes" autocomplete></textarea>
          </div>
          <input type="submit" class="input-reset pill cf fr f5 link br-pill ba ph4 pv3 mb2 dib bg-light-green" value="Save" />
        </form>
      </section>
    </body>
  `
}

function makeRange (start, end, step = 50) {
  var res = []
  var split = start.toFixed(2).split('.').map(v => Number(v))
  var tens = split[0]
  var decimal = split[1] || 0

  while (tens + (decimal / 100) <= end) {
    res.push(tens + (decimal / 100))
    if (decimal + step === 100) {
      decimal = 0
      tens++
    }
    decimal += step
  }
  return res
}

function getLastWeight () {
  // get the last recorded weight
  return 34.6
}
