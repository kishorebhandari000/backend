const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecretKey";

// register user
const createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });

    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid login details",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        error: "Invalid login details",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, JWT_SECRET);

    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
// get logged in user
const getUser = async (req, res) => {
  try {

    // user id from middleware
    const userId = req.user.id;

    // find user and hide password
    const user = await User.findById(userId).select("-password");

    res.send(user);

  } catch (error) {

    console.error(error.message);

    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  createUser,
  loginUser,
  getUser,
};