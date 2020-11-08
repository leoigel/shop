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
const admin = (req,res,next)=>{

  if(req.user && req.user.isAdmin) {
    next()
  } else{
    return res.status(401).json({
      message:'You dont have authorization'
    })
  }
}
module.exports = {auth,admin};

