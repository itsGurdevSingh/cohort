const { getHomePage } = require('../controllers/index.controller');
const isUserLogedIn = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.route('/').get(isUserLogedIn,getHomePage)

module.exports =router;