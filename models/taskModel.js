const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, "Please enter a short task name"],
    maxLength: [30, "Task name should be less than 30 characters"],
  },
  taskDescription: String,
  completionStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);
