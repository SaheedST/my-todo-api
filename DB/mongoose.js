require("dotenv").config();
const mongoose = require("mongoose");

const dbStr = 'mongodb+srv://Saheed:KsY4LMzMOwXe15P1@mycluster.zpbjgn2.mongodb.net/Task-Manager?retryWrites=true&w=majority';

const connectDB = () => {
  return mongoose.connect(dbStr);
};

module.exports = connectDB;
