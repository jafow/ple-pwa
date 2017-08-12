const sqlite3 = require('sqlite3')
const path = require('path')
const fs = require('fs')
const seedrandom = require('seedrandom')
const rng = seedrandom()

function DbController (execFile) { 
  var db = new sqlite3.Database('db/db1.sql') // should be passed in
  var reqBody = {}
  var txId = 0

  db.exec(fs.readFileSync(path.join(__dirname, '..', 'db', execFile), 'utf8'))

  
  function setBody (_reqBody) {
    reqBody = Object.assign({}, _reqBody)
    return reqBody
  }

  async function runMeasures () {
    var row = {
      id: txId,
      date: Date.parse(reqBody.date),
      weight: parseFloat(reqBody.weight, 10),
      arm: parseFloat(reqBody.arm, 10),
      abdomen: parseFloat(reqBody.abdomen, 10),
      foot: parseFloat(reqBody.foot, 10)
    }
    var cols = Object.keys(row)
    var vals = Object.values(row)
    var qs = cols.map(v => '?').join(',')

    await db.run(
      `INSERT INTO measures
      (${cols})
      VALUES
      (${qs})
      ;`, vals)

    return db
  }

  async function runOptions () {
    var opts
    if (!reqBody.options) reqBody.options = []
    if (Array.isArray(reqBody.options)) {
      opts = [...reqBody.options]
    } else {
      opts = [reqBody.options]
    }

    var cols = opts.map(v => {
      if (/:/.test(v)) {
        return v.replace(':', '_').replace('/', '')
      }
      return v.replace('/', '')
    })
    var vals = cols.map(v => 1)

    await db.run(`INSERT INTO options
      (${cols})
      VALUES
      (${vals})
      ;`)
    return db
  }

  async function runNotes () {
    if (!reqBody.notes) return

    let notes = reqBody.notes.toString()
    await db.run(`INSERT INTO notes
      ('notes_id', 'notes')
      VALUES
      (?, ?)
      ;`, [txId, notes])
    return db
  }

  function setTxId () {
    txId = -(rng.int32(Date.now()))
    return txId
  }

  async function run (req, res, next) {
    setBody(req.body)
    setTxId()
    runMeasures()
    runOptions()
    runNotes()
    next()
  }

  async function get (req, res, next) {
    req.body.success = 'successfull'
    await db.all(`
      SELECT ALL
        measures.*, opts.*, n.notes
      FROM measures
        LEFT JOIN options opts ON opts.options_id = measures.id
        LEFT JOIN notes n ON measures.id = n.notes_id
      ORDER BY measures.date ASC
        ;`
    , function setHistory (err, history) {
      if (err) throw err
      req.body.history = [...history]
      console.log('db history ', req.body.history)
      next()
    })
  }
  return {
    run,
    get,
  }
}
module.exports = DbController
