// Required Packeges
let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')

const todoSchema = mongoose.Schema(
  {
    text: String,
    completed: { type: Boolean, default: false },
    color: String,
  },
  { timestamps: true, versionKey: false }
)

// Integrate Mongoose Unique Validator Plugin
todoSchema.plugin(uniqueValidator, {
  message: '{PATH} should be unique, {VALUE} Already Exists!',
})

// Make Model
const TodoModel = mongoose.model('todo', todoSchema)

// Export Model
module.exports = TodoModel
