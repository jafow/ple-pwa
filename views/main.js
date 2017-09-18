var html = require('choo/html')
var dateHelper = require('../lib/date-helper.js')
var makeRange = require('../lib/make-range.js')

var ranges = {
  weight: {
    start: 33.0,
    end: 36.6
  },
  arm: {
    start: 16.0,
    end: 18.5
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
      <header class="w-100 bg-dark-green h3 shadow-4">
        <h3 class="f3 w-60 ma0 mt3 cf fr white">PLE Stats</h3>
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
          <p class="mt4">
            <label class="ph3" for="date">Date</label>
            <input type="date" id="date" name="date" placeholder=${defaultDate} value=${defaultDate} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
          </p>
          <p>
            <label class="ph3">Weight</label>
            <input type="number" name="weight" step="0.2" placeholder=${String(lastWeight)} value=${lastWeight} />
          </p>
          <p>
            <label class="ph3">Arm Size</label>
            <select name="arm">
              ${armRange.map(v => html`<option value=${v}>${v}</option>`)}
            </select>
          </p>
          <p>
            <label class="ph3">Abdomen Size</label>
            <select name="abdomen">
              ${abRange.map(v => html`<option value=${v}>${v}</option>`)}
            </select>
          </p>
          <p>
            <label class="ph3">Foot Size</label>
            <select name="foot">
              ${footRange.map(v => html`<option value=${v}>${v}</option>`)}
            </select>
          </p>
          <p>
            <label class="ph3">Poo</label>
            <input type="number" name="poo" step="1" value="1" />
          </p>
          <fieldset class="nb">
            <legend>Options</legend>
            <div>
              ${checkboxItems.map(item =>
                html`
                <div class="fl w-50 pa1">
                  <input id=${item} type="checkbox" name="options" value=${item}/>
                  <label  class="ph3"for=${item}>${item}</label>
                </div>`)
              }
            </div>
          </fieldset>
          <div class="pa3">
            <label class="ph3"class="f6 b db mb2" for="notes">Notes</label>
            <textarea class="bl border-box hover-black w-100 measure pa2 br2 mb2" name="notes" id="notes" autocomplete></textarea>
          </div>
          <input type="submit" class="input-reset pill cf fr f5 link br-pill ba ph4 pv3 mb2 dib bg-dark-green white" value="Save" />
        </form>
      </section>
    </body>
  `
}

function getLastWeight () {
  // get the last recorded weight TODO: pull from Cache
  return 34.6
}
