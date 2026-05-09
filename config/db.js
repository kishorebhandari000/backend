// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const dbConnect = () => {
//   mongoose.connect(process.env.MONGO_URI).then(() => {
//     console.log("DB connected successfully");
//   });
// };

// module.exports = dbConnect;
// const mongoose = require("mongoose");
// require("dotenv").config();

// const dbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DB connected successfully");
//   } catch (error) {
//     console.log("DB connection failed:");
//     console.log(error.message);
//   }
// };

// module.exports = dbConnect;
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed:");
    console.log(error.message);
  }
};

module.exports = dbConnect;