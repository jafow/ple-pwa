module.exports = function dateHelper(ds) {
  if (ds === undefined) {
    throw Error(`must be called with valid date object: ${ds}`)
  }
  let d = new Date(ds)
  d = d.toISOString()
  let res = d.substr(0, d.indexOf('T'))
  return res
}
