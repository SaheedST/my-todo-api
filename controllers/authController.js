const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { confirmPassword } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    if (password !== confirmPassword) return console.log("Enter same password");

    const userSignUpData = {
      userName,
      email,
      password: hashPassword,
      confirmPassword: '***',
    };
    const user = new User(userSignUpData);

    await user.save();

    const token = jwt.sign({ id: user._id }, "catchmeifyoucan", {
      expiresIn: "1h",
    });
    res.status(200).json({ status: "success", user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.signin = async (req, res, next) => {
  try {
    // receive email and password from user
    const { email, password } = req.body;

    // check if email exist and obtain applicable user document
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid email or password" });
    }

    // compare password enterd with hashed password
    const comparePswd = await bcrypt.compare(password, currentUser.password);
    if (!comparePswd) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid email or password" });
    }

    // generate jwt token - set expiration duration for token
    const token = jwt.sign({ id: currentUser._id }, "catchmeifyoucan", {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ user: currentUser.userName, token, userId: currentUser._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.signOut = (req, res, next)=>{

}
