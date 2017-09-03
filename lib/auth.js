const config = require('../config.js')()
const validUser = config.validUser

function auth (req, res, next) {
  if (req.body.validUser === validUser) {
    res.cookie('validUser', validUser, {
      maxAge: 31557600000,
      httpOnly: false,
      signed: true
    })
    next()
  } else {
    res.send('no dice in auth')
  }
}

module.exports = auth
