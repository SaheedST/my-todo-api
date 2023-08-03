require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const task = require("./routes/taskRoutes");
const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");
const connectDB = require("./DB/mongoose");

const app = express();

// General middlewares
app.use(express.json());
// app.use(express.static('public'))
// app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/api/v1/user", auth);
app.use("/api/v1/todo", task);
app.use("/api/v1/user", user);

app.all("*", (req, res, next) => {
  // const site = req.originalUrl;
  // res.status(400).json({ message: `Page ${site} can not be found` });

  const err = new Error(`Page ${req.originalUrl} can not be found`);
  err.statusCode = 404;
  err.status = "fail";

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
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
