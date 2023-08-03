const User = require("../models/userModel");
const Task = require("./../models/taskModel");

exports.getTasks = async (req, res) => {
  try {
    // console.log(req.userId)
    const userTasks = await Task.find({ createdBy: req.userId });
    // const tasks = await Task.find();
    res.status(200).json({ status: "success", userTasks });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.userId });
    const user = await User.findById(req.userId);
    user.tasks.push(task);
    await user.save();
    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", data: updatedTask });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndRemove(id);
    const user = await User.findById(req.userId);
    user.tasks.pull(id);
    await user.save();
    res.status(200).json({ status: "success", data: "task deleted" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};
