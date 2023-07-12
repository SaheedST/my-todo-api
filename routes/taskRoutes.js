const express = require("express");
const router = express.Router();
const taskController = require("./../controllers/taskController");

router.route("/").get(taskController.getTasks).post(taskController.createTask);
router
  .route("/")
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;