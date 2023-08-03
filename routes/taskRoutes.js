const authUser = require("../middleware/is-auth");
const express = require("express");
const router = express.Router();
const taskController = require("./../controllers/taskController");

router
  .route("/")
  .get(authUser, taskController.getTasks)
  .post(authUser, taskController.createTask);
router
  .route("/:id")
  .get(authUser, taskController.getTask)
  .patch(authUser, taskController.updateTask)
  .delete(authUser, taskController.deleteTask);

module.exports = router;
