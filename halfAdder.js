function halfAdder(a, b) {
  return { sum: a ^ b, carry: a & b }
}

function convert2Binary(num) {
  return ('00000000' + num.toString(2)).substr(-8);
}

function performReduction(acc, curr, index) {
  const result = halfAdder(curr, binSplit[index])
  acc.push(result.sum)
  return acc
}

function add(a, b) {
  const bin1 = convert2Binary(a)
  const bin2 = convert2Binary(b)
  binSplit = bin2.split('')
  return bin1.split('').reduceRight(performReduction, []).reverse().join('')
}

const result = add(5, 10)
console.log(result)
