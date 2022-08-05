// Required Packeges
let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')

const charitySchema = mongoose.Schema(
  {
    item: { type: String, required: true },
    category: String,
    charityFor: String,
    quantity: { type: Number, required: true },
    unit: String,
    netPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    city: String,
    division: String,
  },
  { timestamps: true, versionKey: false }
)

// Integrate Mongoose Unique Validator Plugin
charitySchema.plugin(uniqueValidator, {
  message: '{PATH} should be unique, {VALUE} Already Exists!',
})

// Make Model
const charityModel = mongoose.model('charity', charitySchema)

// Export Model
module.exports = charityModel
