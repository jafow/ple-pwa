const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('db/db.sql')
const path = require('path')
const fs = require('fs')
const seedrandom = require('seedrandom')
const rng = seedrandom()

module.exports = DbController

function DbController (execFile) {
  this.db = db
  this.reqBody = {}

  // create table
  this.db.exec(fs.readFileSync(path.join(__dirname, '..', 'db', execFile), 'utf8', noop))
}

DbController.prototype.setBody = function setBody (reqBody) {
  this.reqBody = Object.assign({}, reqBody)
  return this;
}

DbController.prototype.runMeasures = async function runMeasures () {
  var row = {
    id: this.txId,
    date: Date.parse(this.body.date),
    weight: parseFloat(this.body.weight, 10),
    arm: parseFloat(this.body.arm, 10),
    abdomen: parseFloat(this.body.abdomen, 10),
    foot: parseFloat(this.body.foot, 10)
  }
  var cols = Object.keys(row)
  var vals = Object.values(row)
  var qs = cols.map(v => '?').join(',')
  
  await this.db.run(
    `INSERT INTO measures
      (${cols})
      VALUES
      (${qs})
    ;`, vals)
  return this
}
DbController.prototype.runOptions = async function runOptions () {
  var cols = this.body.options.map(v => {
    if (/:/.test(v)) {
      return v.replace(':', '_').replace('/', '')
    }
    return v.replace('/', '')
  })
  var vals = cols.map(v => 1)

  await this.db.run(`INSERT INTO options
    (${cols})
    VALUES
    (${vals})
    ;`)
}
DbController.prototype.runNotes = async function runNotes () {
  if (!this.body.notes) return this

  await this.db.run(`INSERT INTO notes
    (id, notes)
    VALUES
    (${[this.txId, this.body.notes]})
    ;`)
  return this
}
DbController.prototype.setTxId = function setTxId () {
  this.txId = rng.int32(Date.now())
  return this
}
DbController.prototype.run = function dbRun (req, res, next) {
  this.setBody(req.body)
  this.setTxId()
  this.runMeasures()
    .runOptions()
    .runNotes()

  next()
};

function noop () {
  // nothing
}
