/** state controller
 * pulls the posted data from req.body, formats and
 * sets on a new key `parsedState` that is passed to the 
 * "/posted" view
 */

module.exports = function stateCtrl (req, res, next) {
  if (!req.body) return res.send('/404')
  var body = req.body
  var options = {options: []}
  var opts = body.options
    ? body.options.map(v => v.replace('/', ''))
    : []
  var parsed = {
    date: '',
    weight: 0,
    arm: 0,
    abdomen: 0,
    foot: 0,
    options: [],
    notes: ''
  }
  options.options = opts

  req.body.parsedState = Object.assign({}, parsed, body, options)
  next()
}
