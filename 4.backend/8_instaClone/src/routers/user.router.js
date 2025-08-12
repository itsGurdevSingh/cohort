const router = require("express").Router();
const { registerUser, getUserProfile, loginUser } = require("../controllers/user.controller");

router.post("/register", registerUser);
router.get("/", getUserProfile);
router.post("/login", loginUser);

module.exports = router;
