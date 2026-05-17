const express = require("express");
const router = express.Router();

const fetchUser = require("../middleware/fetchUser");

const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

// login
router.post("/login", loginUser);

// register
router.post("/createuser", createUser);

// get logged in user
router.get("/getuser", fetchUser, getUser);

module.exports = router;