// External Modules:
const router = require('express').Router()

// Controller:
const {
  createDonation,
  singleDonation,
  allDonations,
  updateDonation,
  deleteDonation,
} = require('../controllers/donorController')

//Routes:
router.post('/', createDonation)
router.get('/:id', singleDonation)
router.get('/', allDonations)
router.put('/:id', updateDonation)
router.delete('/:id', deleteDonation)

// Exports
module.exports = router
