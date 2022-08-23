// External Module:
const createError = require('http-errors')

//Internal Module:
const TodoModel = require('../models/todoModel')

/**
 * @desc Make Todo
 * @Route [POST]- /api/v1/todos
 * @Access Public
 * @returns {JSON} - Created Todo
 */
const createTodo = async (req, res, next) => {
  try {
    let newTodo = new TodoModel(req.body)
    await newTodo.save()
    res.status(200).json({ status: 'success', data: newTodo })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Get All Todos
 * @Route [GET]- /api/v1/todos
 * @Access Public
 * @returns {Array<JSON>} - All Todos
 */
const allTodo = async (req, res, next) => {
  try {
    let query = {}
    const todos = await TodoModel.find(query)
    res.status(200).json({ status: 'success', data: todos })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Update todo (color, completed, text)
 * @Route [PATCH]- /api/v1/todos/:id
 * @Access Public
 * @returns {JSON} - Updated Todo
 */
const updateTodo = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let options = {
      new: true,
    }
    let updateTodo = await TodoModel.findOneAndUpdate(query, req.body, options)
    res.status(200).json({ status: 'success', data: updateTodo })
  } catch (error) {
    console.log({ error })
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Delete Todo
 * @Route [DELETE]- /api/v1/todos/:id
 * @Access Public
 * @returns {Boolean}
 */
const deleteTodo = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    await TodoModel.deleteOne(query)
    res.status(200).json({ status: 'success', data: true })
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

//Export Module:
module.exports = {
  createTodo,
  allTodo,
  updateTodo,
  deleteTodo,
}
