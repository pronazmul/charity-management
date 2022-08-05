// External Modules:
const router = require('express').Router()

// Controller:
const {
  createCharity,
  singleCharity,
  allCharity,
  updateCharity,
  deleteCharity,
  updatePrice,
} = require('../controllers/charityController')

//Routes:
router.post('/', createCharity)
router.get('/:id', singleCharity)
router.get('/', allCharity)
router.put('/:id', updateCharity)
router.put('/:id/price', updatePrice)
router.delete('/:id', deleteCharity)

// Exports
module.exports = router
