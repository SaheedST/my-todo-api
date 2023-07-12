const Task = require("./../models/taskModel");

exports.getTasks = (req, res) => {
  res.status(200).json({ status: "success", data: "tasks list" });
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.getTask = (req, res) => {
  res.status(200).json({ status: "success", data: "a specific task" });
};

exports.updateTask = (req, res) => {
  res.status(200).json({ status: "success", data: "task updated" });
};

exports.deleteTask = (req, res) => {
  res.status(200).json({ status: "success", data: "task deleted" });
};
