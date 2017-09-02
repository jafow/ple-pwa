// testing state controller
const test = require('tape')
const stateCtrl = require('../lib/state-ctrl.js')
const DbController = require('../lib/setup-db')
const dbCtrl = DbController('../lib/v1.sql')
const dateHelper = require('../lib/date-helper.js')

test('Test state-ctrl module', function (t) {
  t.plan(3)
  t.ok(stateCtrl)
  t.ok(stateCtrl.format, 'exports a #format method')
  t.ok(stateCtrl.hist, 'exports a #hist method')
})

test('Test stateCtrl#format method', function (t) {
  var d = dateHelper(new Date())
  var req1 = {
    body: {
      date: d,
      weight: '30.4',
      abdomen: '50.2',
      foot: '15.4'
    }
  }

  var req2 = {
    body: {
      date: d,
      options: 'opt1/'
    }
  }

  var req3 = {
    body: {
      date: d,
      arm: '16.6',
      options: ['opt1/', 'opt2/', 'opt3/']
    }
  }

  var badReq = { nobody: 'should fail' }
  var badRes = { send: function (str) { return str } }

  stateCtrl.format(req1, {}, function () {
    t.ok(req1.body.parsedState, 'sets a "parsedState" property')
    t.ok(Array.isArray(req1.body.parsedState.options), 'sets an "options" array if none are posted')
  })

  stateCtrl.format(req2, {}, function () {
    t.ok(Array.isArray(req2.body.parsedState.options), 'sets an "options" array if one is posted')
    t.equal(req2.body.parsedState.options[0], 'opt1')
  })

  stateCtrl.format(req3, {}, function () {
    t.equal(req3.body.parsedState.options.length, req3.body.options.length, 'sets options if > 1 are posted')
    t.equal(req3.body.parsedState.options[0], 'opt1', 'removes trailing slash from posted options')
  })

  t.equal(stateCtrl.format(badReq, badRes), '<h3>Bad request :-( please try again</h3>', 'sends 404 on bad req')
  t.end()
})

test('Test stateCtrl#hist method', function (t) {
  var badReq = {body: {nope: 'still fails'}}
  var badRes = {send: function (str) { return str }}
  var hist = [
    {id: 1234, date: new Date('2112-02-12'), opt1: null, opt2: 'foo', opt3: 'bar'},
    {id: 1235, date: new Date('2112-02-13'), opt1: null, opt2: 'foo', opt3: 'bar'},
    {id: 1236, date: new Date('2112-02-14'), weight: '35.2', opt1: null, opt2: 'foo'},
    {id: 1237, date: new Date('2112-02-15'), notes: 'some notes here', opt1: null, opt2: 'foo'}
  ]
  var req = {body: {history: hist}}

  stateCtrl.hist(req, {}, function () {
    t.notOk(req.body.mappedHistory[0].opt1, 'does not set null options')
  })

  t.equal(stateCtrl.hist(badReq, badRes), '<h3>Bad request :-( please try again</h3>', 'sends 404 on bad req')
  t.end()
})

test('Test dbCtrl module', function (t) {
  t.plan(3)
  t.ok(dbCtrl)
  t.ok(dbCtrl.run, 'exports a #run method')
  t.ok(dbCtrl.get, 'exports a #get method')
})
