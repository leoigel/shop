const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded);
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};
module.exports = auth;
