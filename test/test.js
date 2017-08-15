// testing state controller
const test = require('tape')
const stateCtrl = require('../lib/state-ctrl.js')

test('Test state-ctrl module', function (t) {
  t.plan(2)
  t.ok(stateCtrl.format, 'exports a #format method')
  t.ok(stateCtrl.hist, 'exports a #hist method')
})

test('Testing #format method', function (t) {
  t.plan(1)
  

})

// helpers
function noop () {}
