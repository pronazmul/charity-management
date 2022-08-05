// Required Packeges
let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')

const foundSchema = mongoose.Schema(
  {
    totalDonation: { type: Number, required: true },
    totalCharity: { type: Number, default: 0 },
    existedAmount: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
)

// Integrate Mongoose Unique Validator Plugin
foundSchema.plugin(uniqueValidator, {
  message: '{PATH} should be unique, {VALUE} Already Exists!',
})

// Make Model
const foundModel = mongoose.model('found', foundSchema)

// Export Model
module.exports = foundModel
