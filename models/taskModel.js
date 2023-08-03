const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "Please enter a short task name"],
      maxLength: [100, "Task name should be less than 30 characters"],
    },
    taskDescription: String,
    completionStatus: {
      type: String,
      default: "open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
