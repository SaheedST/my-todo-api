require("dotenv").config();
const mongoose = require("mongoose");

const dbStr = process.env.DB_CONNECTION_STR;

const connectDB = () => {
  return mongoose.connect(dbStr);
};

module.exports = connectDB;
