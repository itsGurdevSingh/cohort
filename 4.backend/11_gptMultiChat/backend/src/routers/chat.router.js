const { createChat, getChats } = require('../controllers/chat.controller');
const isUserLogedIn = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post('/add',isUserLogedIn,createChat)
router.get('/',isUserLogedIn,getChats)

module.exports = router;