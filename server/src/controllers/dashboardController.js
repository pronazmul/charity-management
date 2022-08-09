// External Module:
const createError = require('http-errors')

//Internal Module:
let Charity = require('../models/charityModel')
const Donor = require('../models/donorModel')
let Found = require('../models/foundModel')
const People = require('../models/peopleModel')
const { isoToMonth, sumCoastByMonth } = require('../utilities/helpers')

/**
 * @desc GET Dashboard Details
 * @Route [GET]- /api/v1/dashboard
 * @Access Private
 * @returns {JSON} - Create Donation
 */
const dashboardDetails = async (req, res, next) => {
  try {
    let data = {}
    let foundDetails = await Found.findOne()
    let donors = await Donor.count()
    let users = await People.count()
    let charities = await Charity.find({}, 'total createdAt')
    let monthlyCharities = charities.map((v) => ({
      donate: v.total,
      name: isoToMonth(v.createdAt),
    }))

    //Formated Data:
    data.totalAmount = foundDetails.existedAmount
    data.totalCharity = foundDetails.totalCharity
    data.users = users
    data.donors = donors
    data.report = sumCoastByMonth(monthlyCharities, 'name', 'donate')

    res.status(200).json({ status: 'success', data: data })
  } catch (error) {
    console.log(error)
    next(createError(500, 'Internal Server Error!'))
  }
}

//Export Module:
module.exports = {
  dashboardDetails,
}
