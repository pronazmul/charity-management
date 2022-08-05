// Required Packeges
let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')

const donorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    mobile: String,
    organization: { type: String, required: true },
    amount: { type: Number, required: true },
    avatar: String,
  },
  { timestamps: true, versionKey: false }
)

// Integrate Mongoose Unique Validator Plugin
donorSchema.plugin(uniqueValidator, {
  message: '{PATH} should be unique, {VALUE} Already Exists!',
})

// Make Model
const DonorModel = mongoose.model('donor', donorSchema)

// Export Model
module.exports = DonorModel
