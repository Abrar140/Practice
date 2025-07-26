const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    default: "lahore",
  },
  role: {
    type: String,
    default: "user",
  },
  assignedtask: {
    type: Number,
    default: 0,
  },
  inprocesstask: {
    type: Number,
    default: 0,
  },

  completedtask: {
    type: Number,
    default: 0,
  },
  totaltask: {
    type: Number,
    default: 0,
  },
});
UserSchema.pre("save", function (next) {
  if (
    this.isModified("assignedtask") ||
    this.isModified("inprocesstask") ||
    this.isModified("completedtask")
  ) {
    // this.totaltask =
    //   this.assignedtask + this.inprocesstask + this.completedtask;
    this.totaltask =
      (this.assignedtask || 0) +
      (this.inprocesstask || 0) +
      (this.completedtask || 0);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
