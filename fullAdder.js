function fullAdder(a, b, carryIn) {
  const [halfSum1, halfCarry1] = halfAdder(a, b);
  const [halfSum2, halfCarry2] = halfAdder(carryIn, halfSum1)
  return { sum: halfSum2, carryOut: halfCarry1 | halfCarry2 }
}

function halfAdder(a, b) {
  return [a ^ b, a & b]
}

function convert2Binary(num) {
  return ('00000000' + (num >>> 0).toString(2)).substr(-8);
}

function add(num1, num2) {
  const bin1 = convert2Binary(num1);
  const bin2 = convert2Binary(num2);
  binSplit = bin2.split('')
  let carryIn = 0
  let result = bin1.split('').reduceRight(function performReduction(acc, curr, index) {
    const result = fullAdder(curr, binSplit[index], carryIn)
    carryIn = result.carryOut
    acc.push(result.sum)
    return acc
  }, [])
  carryIn === 1 ? result.push(carryIn) : null
  return result.reverse().join('')
}

//  assume a is minuend and b is subtrahend
function subtract(num1, num2) {
  const bin1 = convert2Binary(num1) //minuend
  const bin2 = convert2Binary(num2) //subtrahend
  const bin2flip = convert2Binary(~num2) // 1's complement of subtrahend
  console.log(bin2flip)
  const result1 = add(bin1, bin2flip)
  binSplit = bin2.split('')
}

function flipBits (num) {
  return convert2Binary(~num)
}

const result = add(253, 79)
console.log(result)