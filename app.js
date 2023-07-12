require("dotenv").config();
const express = require("express");
const task = require("./routes/taskRoutes");
const connectDB = require("./DB/mongoose");

const app = express();

// General middlewares
app.use(express.json());

app.use("/api/v1/todo", task);

app.get("/", (req, res) => {
  res.json({ name: "new task" });
});

const start = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on Port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
