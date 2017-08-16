module.exports = function dateHelper (ds) {
  let d
  if (ds === undefined) {
    throw Error(`must be called with valid date object: ${ds}`)
  }
  if (ds instanceof Date) {
    d = ds
  } else {
    d = new Date(ds)
  }
  d = d.toISOString()
  return d.substr(0, d.indexOf('T'))
}
