const User = require("../models/userModel");
// const Task = require("./../models/taskModel");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};