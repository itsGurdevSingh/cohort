const { getRegisterPage, registerUser, getUserLoginPage, userLogin } = require('../controllers/auth.controller');

const router = require('express').Router();

router.route('/register')
        .get(getRegisterPage)
        .post(registerUser)

router.route('/login')
        .get(getUserLoginPage)
        .post(userLogin)

module.exports = router