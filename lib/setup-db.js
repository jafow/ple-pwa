const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('db/db.sql')
const path = require('path')
const fs = require('fs')

// create table
db.exec(fs.readFileSync(path.join(__dirname, '../sql/v1.sql'), noop)

module.exports = dbController

function dbController (req, res, next) {

}


function noop () {
  // nothing
}
