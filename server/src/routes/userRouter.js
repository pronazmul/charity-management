// External Modules:
const router = require('express').Router()

// Controller:
const {
  createUser,
  userLogin,
  userProfile,
  getSingleUser,
  allUsers,
  updateUser,
  deleteUser,
  avatarUpload,
} = require('../controllers/userController')

// Middlewares
const authCheck = require('../middlewares/authentication/authCheck')
const authorize = require('../middlewares/authentication/authorize')
const {
  userCreateValidator,
  userValidationHandler,
  userUpdateValidator,
} = require('../middlewares/dataValidation/userValidator')
const { singleConvertToWebp } = require('../middlewares/upload/imageConverter')
const { singleUploader } = require('../middlewares/upload/imageUploader')

//Routes:

router.post('/', userCreateValidator, userValidationHandler, createUser)
router.get('/', allUsers)
router.post('/auth', userLogin)
router.get('/profile', userProfile)
router.get('/:id', getSingleUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/:id/upload')
router.post(
  '/:id/upload',
  authCheck,
  authorize(['admin', 'user']),
  singleUploader('avatar', 'users'),
  singleConvertToWebp('users'),
  avatarUpload
)

// Exports
module.exports = router
