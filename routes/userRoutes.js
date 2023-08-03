const isAuth = require("./../middleware/is-auth");
const userController = require("./../controllers/userController");

const express = require("express");

const router = express.Router();

router.route("/").get(isAuth, userController.getUser);

module.exports = router