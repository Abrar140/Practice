const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique :true,
    required:true
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Todos = mongoose.model("Todo", TodoSchema);
module.exports = Todos;
