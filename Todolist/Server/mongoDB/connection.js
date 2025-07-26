const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Todo";

const mongoConnection = async () => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error while connecting MongoDB:", error.message);
  }
};

module.exports = mongoConnection;
