// External Modules:
const router = require('express').Router()

// Controller:
const {
  createTodo,
  allTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController')

//Routes:
router.post('/', createTodo)
router.get('/', allTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

// Exports
module.exports = router
