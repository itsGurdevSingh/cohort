const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).send("Please login or sign up.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).send("Invalid or expired token.");
    }

    req.userId = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).send("Invalid or expired token.");
  }
};

module.exports = isLoggedIn;
