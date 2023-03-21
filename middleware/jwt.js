const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  // !TODO >> also compare income token as a string with token located in the server
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

module.exports = { verifyToken };
