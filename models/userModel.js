const mongoose = require("mongoose");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Enter your username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Your email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: function () {
        return validator.validate(this.email);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    trim: true,
    minLength: [8, "Password should be at least 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Enter same password"],
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
