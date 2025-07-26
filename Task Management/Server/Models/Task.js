const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  // completed: { type: Boolean, default: false },
  status:{
    type:String,
    default:"Assigned"},

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", TaskSchema);
