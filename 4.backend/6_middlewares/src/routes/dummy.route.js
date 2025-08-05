const express = require("express");
const dummyMiddleware = require("../middlewares/dummy.middleware.js");

const router = express.Router();

router.use(dummyMiddleware);

router.get('/', (req, res) => {
  console.log('In final handler');

    res.status(200).json({ 
        msg: req.body.msg,
        message: req.middlewareMsg 
    }); // ✅ only send what's serializable

});

module.exports = router;
