function fullAdder(a, b, carryIn) {
  const [halfSum1, halfCarry1] = halfAdder(a, b);
  const [halfSum2, halfCarry2] = halfAdder(carryIn, halfSum1)
  return { sum: halfSum2, carryOut: halfCarry1 | halfCarry2 }
}

function halfAdder(a, b) {
  return [a ^ b, a & b]
}

function fullSubtractor(a, b) {
  return a ^ b
}

/**
 * 
 * @param {String} bin
 * @returns {Number} 
 */
function convert2Decimal(bin) {
  return parseInt(bin, 2)
}

/**
 * 
 * @param {Number} num
 * @param {Number} padding
 * @return {String} 
 */
function convert2Binary(num, padding) {
  return ('00000000' + (num >>> 0).toString(2)).substr(-padding);
}

function subReduction(num1, num2) {
  let binSplit = num2.split('')
  let result = num1.split('').reduceRight(function performReduction(acc, curr, index) {
    let result = fullSubtractor(curr, binSplit[index])
    acc.push(result)
    return acc
  }, [])
  return result.reverse().join('')
}

function addReduction(num1, num2) {
  let binSplit = num2.split('')
  let carryIn = 0
  let result = num1.split('').reduceRight(function performReduction(acc, curr, index) {
    const result = fullAdder(curr, binSplit[index], carryIn)
    carryIn = result.carryOut
    acc.push(result.sum)
    return acc
  }, [])
  carryIn === 1 ? result.push(carryIn) : null
  return result.reverse().join('')
}

/**
 * 
 * @param {String} num1 
 * @param {String} num2 
 * @param {Number} operationBit 0 to perform addition, 1 to perform subtraction
 * @returns {String}
 */
function binaryAdder(num1, num2, operationBit = 0) {
  if (num1.length !== num2.length) {
    let l = num1.length > num2.length ? num1.length : num2.length
    num1 = convert2Binary(convert2Decimal(num1), l)
    num2 = convert2Binary(convert2Decimal(num2), l)
  }
  return operationBit ? subReduction(num1, num2) : addReduction(num1, num2)
}

/**
 * 
 * @param {String} num1 
 * @param {String} num2
 * @returns {String}
 */
function add(num1, num2) {
  const bin1 = convert2Binary(num1, 8)
  const bin2 = convert2Binary(num2, 8)
  const result = binaryAdder(bin1, bin2)
  return convert2Decimal(result)
}

/**
 * 
 * @param {String} num1 The minuend
 * @param {String} num2 The subtrahend
 */
function subtract(num1, num2) {
  if (num1 > 255 || num2 > 255) {
    throw new Error('Sorry, can only handle 8-bit numbers')
  }
  const bin1 = convert2Binary(num1, 8) //minuend
  const bin2 = convert2Binary(num2, 8) //subtrahend
  const bin2flip = convert2Binary(~num2, 8) // 1's complement of subtrahend
  const result1 = binaryAdder(bin1, bin2flip)
  const result2 = binaryAdder(result1, convert2Binary(1, 8))
  const result3 = binaryAdder(result2, convert2Binary(256, 9), 1)
  return convert2Decimal(result3)
}

const result = subtract(200, 100)
console.log(result)