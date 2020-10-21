const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Password or Email is wrong",
      });
    }
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.json({
        message: "user is not authorized to see this page",
      });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, name, isAdmin } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json({
        message: "user already exist",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
    });
    res.status(201).json({
      name,
      email,
      password,
      isAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      _id: newUser._id,
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
