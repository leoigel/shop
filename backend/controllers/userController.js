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
    console.log(user)
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
    const user = await User.findById(req.user._id);
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password

    const updatedUser = await user.save()
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req,res) => {
  try {
    const users = await User.find({});
    res.json(users)
  }catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

exports.deleteUser = (async(req,res) => {
  try{
    const user = await User.findById(req.params.id)
    if(!user) {
      return res.status(404).json({message:'User not found'})
    }
    await user.remove()
    res.json({ message: 'User removed' })
  }catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
})

exports.getUserById = (async(req,res) => {
 try{

  const user = await User.findById(req.params.id).select('-password');
  if(!user) {
    return res.status(404).json({message:'User not found'})
  }
  res.json(user)

 }catch(error) {
  res.status(500).json({
    message: error.message,
  });
 }
})

exports.updateUser = (async(req,res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  }else {
    return  res.status(404).json({message:'User not found'})
  }
})

