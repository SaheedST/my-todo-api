const userAuth = require('./../controllers/authController')
const express = require('express')

const router = express.Router()

router.route('/signup').post(userAuth.signup)
router.route('/signin').post(userAuth.signin)

module.exports = router