const router = require('express').Router()
const userRoutes = require('./userRouter')
const donorRoutes = require('./donorRouter')
const charityRoutes = require('./charityRouter')
const dashboardRoutes = require('./dashboardRouter')
const todoRoutes = require('./todoRouter')

const authCheck = require('../middlewares/authentication/authCheck')

//Health Checker
router.use('/health', (_req, res) => res.status(200).json({ status: 'ok' }))

// Application Routes
router.use('/api/v1/users', userRoutes)
router.use('/api/v1/donors', donorRoutes)
router.use('/api/v1/charity', charityRoutes)
router.use('/api/v1/dashboard', dashboardRoutes)
router.use('/api/v1/todos', todoRoutes)

// Module Exports
module.exports = router
