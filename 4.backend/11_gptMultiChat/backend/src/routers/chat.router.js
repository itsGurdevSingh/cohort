const { createChat } = require('../controllers/chat.controller');
const isUserLogedIn = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post('/add',isUserLogedIn,createChat)

module.exports = router;