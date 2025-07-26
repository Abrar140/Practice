const express = require("express");
const mongoose = require("mongoose");
const createhttperrors = require("http-errors");
const morgan = require("morgan");

const PORT = 5000;

const cors = require("cors");
const taskRoutes = require("./Routes/Task");
const userRoutes = require("./Routes/User");

const taskUserView = require("./Views/TaskUserView");
const taskUserDetailView = require("./Views/TaskUserView");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

mongoose
  .connect("mongodb://localhost:27017/TaskMangement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("data basee is connected");
  })
  .catch((error) => {
    console.log(err.message);
  });

app.use("/task", taskRoutes);
app.use("/user", userRoutes);

app.get("/api/task-view", async (req, res) => {
  console.log(" i am inise api");
  const taskwithUser = await taskUserView();
  res.send(taskwithUser);
});
app.get("/api/task-detail-view", async (req, res) => {
  try {
    const taskDetails = await taskUserDetailView();
    res.send(taskDetails);
  } catch (error) {
    res.status(500).send({ message: "Error fetching task details", error });
  }
});

app.use((req, res, next) => {
  next(createhttperrors.NotFound());
});
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send(error);
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
