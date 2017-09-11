module.exports = function makeRange (start, end, step = 50) {
  var res = []
  var split = start.toFixed(2).split('.').map(v => Number(v))
  var tens = split[0]
  var decimal = split[1] || 0

  while (tens + (decimal / 100) <= end) {
    res.push(tens + (decimal / 100))
    if (decimal + step >= 100) {
      decimal = 0
      tens++
    } else {
      decimal += step
    }
  }
  return res
}
