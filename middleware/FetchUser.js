const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecretKey";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Please authenticate using valid token",
    });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);

    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }
};

module.exports = fetchUser;