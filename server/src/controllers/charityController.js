// External Module:
const createError = require('http-errors')

//Internal Module:
let Charity = require('../models/charityModel')
let Found = require('../models/foundModel')

/**
 * @desc Make Charity
 * @Route [POST]- /api/v1/charity
 * @Access Private
 * @returns {JSON} - Create Donation
 */
const createCharity = async (req, res, next) => {
  try {
    let { quantity, netPrice } = req.body
    let total = quantity * netPrice
    let newCharity = new Charity({ ...req.body, total })

    //Reduction From Fund
    let foundDetails = await Found.findOne()
    let { totalCharity, existedAmount } = foundDetails
    foundDetails.totalCharity = totalCharity + total
    foundDetails.existedAmount = existedAmount - total
    await foundDetails.save()
    await newCharity.save()

    res.status(200).json({ status: 'success', data: newCharity })
  } catch (error) {
    console.log(error)
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc GET Single Charity
 * @Route [GET]- /api/v1/charity/:id
 * @Access Private
 * @returns {JSON} - Charity Object
 */
const singleCharity = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let projection = 'item charityFor quantity unit total city division'
    const charity = await Charity.findOne(query, projection)
    res.status(200).json({ status: 'success', data: charity })
  } catch (error) {
    next(createError(500, 'Failed to fetch data!'))
  }
}

/**
 * @desc Get All Charity
 * @Route [GET]- /api/v1/charity
 * @Access Private
 * @returns {Array<JSON>} - All Charities
 */
const allCharity = async (req, res, next) => {
  try {
    let query = {}
    let projection = 'item charityFor quantity unit total city division'
    const charities = await Charity.find(query, projection)
    res.status(200).json({ status: 'success', data: charities })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Update Charity
 * @Route [PUT]- /api/v1/charity/:id
 * @Access Private
 * @returns {JSON} - Updated Charity
 */
const updateCharity = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let options = {
      new: true,
      select: 'item charityFor quantity unit total city division',
    }

    let { total, quantity, unit, netPrice, ...updatedData } = req.body
    let updatedCharity = await Charity.findOneAndUpdate(
      query,
      updatedData,
      options
    )

    res.status(200).json({ status: 'success', data: updatedCharity })
  } catch (error) {
    console.log({ error })
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Update Charity
 * @Route [PUT]- /api/v1/charity/:id/price
 * @Access Private
 * @returns {JSON} - Updated Charity
 */
const updatePrice = async (req, res, next) => {
  try {
    const query = { _id: req.params.id }
    const options = {
      new: true,
      select: 'item charityFor quantity unit total city division',
    }
    const { quantity, netPrice } = req.body
    const charityLookup = await Charity.findById(query)
    const currentTotal = charityLookup.total
    const newTotal = quantity * netPrice
    const updatedData = {
      quantity,
      netPrice,
      total: newTotal,
    }

    //Adjust ballanc to Found
    if (newTotal > currentTotal) {
      let foundDetails = await Found.findOne()
      let { totalCharity, existedAmount } = foundDetails
      let addAbleBallance = newTotal - currentTotal
      foundDetails.totalCharity = totalCharity + addAbleBallance
      foundDetails.existedAmount = existedAmount - addAbleBallance
      await foundDetails.save()
    }

    if (currentTotal > newTotal) {
      let foundDetails = await Found.findOne()
      let { totalCharity, existedAmount } = foundDetails
      let removableBallance = currentTotal - newTotal
      foundDetails.totalCharity = totalCharity - removableBallance
      foundDetails.existedAmount = existedAmount + removableBallance
      await foundDetails.save()
    }
    const updatedCharity = await Charity.findOneAndUpdate(
      query,
      updatedData,
      options
    )
    res.status(200).json({ status: 'success', data: updatedCharity })
  } catch (error) {
    console.log({ error })
    console.log(error)
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Delete Charity
 * @Route [DELETE]- /api/v1/charity/:id
 * @Access Private
 * @returns {Boolean} - Deleted Status
 */
const deleteCharity = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let details = await Charity.findById(query)
    let { total } = details

    //Add Deleted Charity Balance to Fund
    let foundDetails = await Found.findOne()
    let { totalCharity, existedAmount } = foundDetails
    foundDetails.totalCharity = totalCharity - total
    foundDetails.existedAmount = existedAmount + total
    await foundDetails.save()

    await Charity.deleteOne(query)
    res.status(200).json({ status: 'success', data: true })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

//Export Module:
module.exports = {
  createCharity,
  singleCharity,
  allCharity,
  updateCharity,
  updatePrice,
  deleteCharity,
}
