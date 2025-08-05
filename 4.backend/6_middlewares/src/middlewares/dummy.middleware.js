// dummy.middleware.js
const dummyMiddleware = (req, res, next) => {
  req.middlewareMsg = "Hello from dummy middleware";
  console.log("Middleware ran");
  next();
};

module.exports = dummyMiddleware;
