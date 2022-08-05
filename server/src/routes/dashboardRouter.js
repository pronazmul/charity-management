// External Modules:
const router = require('express').Router()

// Controller:
const { dashboardDetails } = require('../controllers/dashboardController')

//Routes:
router.get('/', dashboardDetails)

// Exports
module.exports = router
