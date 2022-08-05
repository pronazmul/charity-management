const { months } = require('./constants')

/**
 * @desc Express Validator Error Object formatter Helper Functions
 * @param {Object} Error Object
 * @returns {Object} Formatted Object
 */
const expressValidatorErrorFormatter = (error) => {
  return Object.entries(error).reduce(
    (state, [k, { msg }]) => ({ ...state, [k]: msg }),
    {}
  )
}

/*
@ desc: Array where add value in last and store number of values if exists remove from first.
@ param [:any] - value to be added last
@ param [:array] - Main array to work with
@ param [:number] - Number of value will be stored inside array.
@ return [:array] - Return modified array
 */
const lifoArray = (inValue, array, numOfStore) => {
  let newArray = [...array, inValue]
  return newArray.slice(-numOfStore)
}

/**
 * @desc ISO String To Moth Maker
 * @param {String} ISO -Time String
 * @returns {String} Month name
 */
const isoToMonth = (iso) => {
  return months[new Date(iso).getMonth()]
}

/**
 * @desc Monthy sum value Calculator
 * @param {Array} array to iterate
 * @param {String} Field name to Sum
 * @returns {Array<JSON>} - Modified JSON Array
 */
const sumCoastByMonth = (array, monthName, fieldName) =>
  array.reduce((state, value) => {
    let data = [...state]
    let index = data.findIndex((v) => v[monthName] === value[monthName])
    if (index !== -1) {
      data[index][fieldName] += value[fieldName]
    } else {
      data.push(value)
    }
    return data
  }, [])

module.exports = {
  expressValidatorErrorFormatter,
  lifoArray,
  isoToMonth,
  sumCoastByMonth,
}
