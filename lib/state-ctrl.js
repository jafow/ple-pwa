/** state controller
 * pulls the posted data from req.body, formats and
 * sets on a new key `parsedState` that is passed to the 
 * "/posted" view
 */

module.exports = stateCtrl()

function stateCtrl () {
  return {
    format,
    hist
  }

  function format (req, res, next) {
    if (!req.body) return res.send('/404')

    var opts
    var body = req.body
    var parsed = {
      date: '',
      weight: 0,
      arm: 0,
      abdomen: 0,
      foot: 0,
      options: [],
      notes: ''
    }

    if (Array.isArray(body.options)) {
      opts = [...body.options]
    } else {
      opts = [body.options]
    }

    var options = {options: opts.map(v => v !== undefined
        ? v.replace('/', '')
        : ''
      )
    }

    req.body.parsedState = Object.assign({}, parsed, body, options)
    next()
  }
    
  function dateHelper (ds) {
    let d = new Date(ds)
    d = d.toISOString()
    let res = d.substr(0, d.indexOf('T'))
    return res
  }

  function hist (req, res, next) {
    if (!req.body.history) res.send('/404')

    var hist = [...req.body.history]
    var defaults = {
      id: 0,
      date: '',
      weight: 0,
      arm: 0,
      abdomen: 0,
      foot: 0,
      notes: ''
    }

    var mappedHistory = hist.map(row => {
      let formatted = {}
      formatted.options = []

      for (let key in row) {
        // remove null options
        if (row[key] !== null) {
          if (defaults[key] === undefined) {
            // it's an option not a measure
            formatted.options.push(key)
          } else {
            formatted[key] = row[key]
          }
        }
      }
      formatted.date = dateHelper(row.date)

      return formatted
    })

    req.body.mappedHistory = mappedHistory
    next()
  }
}
