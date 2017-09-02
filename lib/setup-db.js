const sqlite3 = require('sqlite3')
const path = require('path')
const fs = require('fs')
const seedrandom = require('seedrandom')
const rng = seedrandom()
const dbPath = process.env.DB_PATH || require('./../config.js')().dbPath
function DbController (execFile) {
  var db = new sqlite3.Database(dbPath)
  var reqBody = {}
  var txId = 0

  db.exec(fs.readFileSync(path.join(__dirname, '..', 'lib', execFile), 'utf8'))

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
      foot: parseFloat(reqBody.foot, 10),
      poo: parseInt(reqBody.poo, 10)
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
    if (!reqBody.options) return
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
    }).concat('options_id')

    var vals = opts.map(v => 1).concat(txId.toString())
    var qs = cols.map(q => '?').join(',')

    await db.run(`INSERT INTO options
      (${cols})
      VALUES
      (${qs})
      ;`, vals)
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
    txId = Math.abs(rng.int32(Date.now()))
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
        measures.*, options.*, n.notes
      FROM measures
        JOIN options ON measures.id = options.options_id
        JOIN notes n ON measures.id = n.notes_id
      ORDER BY measures.date DESC;
        ;`
    , function setHistory (err, history) {
      if (err) throw err
      req.body.history = [...history]
      next()
    })
  }
  return {
    run,
    get
  }
}
module.exports = DbController
