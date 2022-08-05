// External Module:
const createError = require('http-errors')

//Internal Module:
let Donor = require('../models/donorModel')
let Found = require('../models/foundModel')

/**
 * @desc Make New Donation
 * @Route [POST]- /api/v1/donors
 * @Access Private
 * @returns {Object} - Create Donation
 */
const createDonation = async (req, res, next) => {
  try {
    let newDonation = new Donor(req.body)
    await newDonation.save()
    //Add Donation To Found
    let { amount } = newDonation
    const foundExists = await Found.count()
    if (!!foundExists) {
      let found = await Found.findOne()
      found.totalDonation = found.totalDonation + amount
      found.existedAmount = found.existedAmount + amount
      await found.save()
    } else {
      let newFound = new Found({ totalDonation: amount, existedAmount: amount })
      await newFound.save()
    }
    res.status(201).json({ status: 'success', data: newDonation })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc GET Single Donation
 * @Route [GET]- /api/v1/donors/:id
 * @Access Private
 * @returns {Object} - Donation Object
 */
const singleDonation = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let projection = 'name email mobile organization amount'
    const donor = await Donor.findOne(query, projection)
    res.status(200).json({ status: 'success', data: donor })
  } catch (error) {
    next(createError(500, 'Failed to fetch data!'))
  }
}

/**
 * @desc Get All Donations
 * @Route [GET]- /api/v1/donors
 * @Access Private
 * @returns {Array<Object>} - All Donations
 */
const allDonations = async (req, res, next) => {
  try {
    let query = {}
    let projection = 'name email mobile organization amount'
    const donors = await Donor.find(query, projection)
    res.status(200).json({ status: 'success', data: donors })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Update Donation
 * @Route [PUT]- /api/v1/donors/:id
 * @Access Private
 * @returns {Object} - Updated Donation.
 */
const updateDonation = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let options = { new: true, select: 'name email mobile organization amount' }
    let { amount, ...updatedData } = req.body
    let updatedDonor = await Donor.findOneAndUpdate(query, updatedData, options)

    res.status(200).json({ status: 'success', data: updatedDonor })
  } catch (error) {
    console.log({ error })
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Delete Donation
 * @Route [DELETE]- /api/v1/donors/:id
 * @Access Private
 * @returns {Boolean} - Deleted Status
 */
const deleteDonation = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let details = await Donor.findById(query)

    //Reduce Deleted Donor Amount
    let foundDetails = await Found.findOne()
    let { totalDonation, existedAmount } = foundDetails
    foundDetails.totalDonation = totalDonation - details.amount
    foundDetails.existedAmount = existedAmount - details.amount
    await foundDetails.save()

    await Donor.deleteOne(query)
    res.status(200).json({ status: 'success', data: true })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

//Export Module:
module.exports = {
  createDonation,
  singleDonation,
  allDonations,
  updateDonation,
  deleteDonation,
}
