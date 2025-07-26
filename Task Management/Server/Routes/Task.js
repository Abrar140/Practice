const express = require("express");
const Task = require("../Models/Task");
const User = require("../Models/User");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  try {
    const { title, description, dueDate, user } = req.body;

    if (!title || !description || !dueDate || !user) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    requser = await User.findOne({ _id: user });
    if (requser) {
      try {
        const incrementResult = await User.findOneAndUpdate(
          { _id: requser._id },
          {
            $inc: { assignedtask: 1 }, // Increment assignedtask by 100
          },
          {
            new: true, // Return the updated document
            runValidators: true, // Ensure that the document is validated
          }
        );

        // Recalculate totaltask
        incrementResult.totaltask =
          (incrementResult.assignedtask || 0) +
          (incrementResult.inprocesstask || 0) +
          (incrementResult.completedtask || 0);

        // Save the document
        await incrementResult.save();
      } catch (error) {
        console.error("Failed to update user:", error);
        return res.send(400).json({ message: "Failed to update user" });
      }
    }

    const task = new Task({ title, description, dueDate, user });
    await task.save();
    return res.status(200).json({ message: "Task saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrive users" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Task ID is required." });
    }
    const tasks = await Task.findOne({ _id: id });

    prevuser = await User.findOne({ _id: tasks.user });
    if (prevuser) {
      try {
        // First operation: Increment assignedtask by 100

        // Second operation: Decrement assignedtask by 1
        const decrementResult = await User.findOneAndUpdate(
          { _id: prevuser._id },
          {
            $inc: { assignedtask: -1 }, // Decrement assignedtask by 1
          },
          {
            new: true, // Return the updated document
            runValidators: true, // Ensure that the document is validated
          }
        );

        // Recalculate totaltask
        decrementResult.totaltask =
          (decrementResult.assignedtask || 0) +
          (decrementResult.inprocesstask || 0) +
          (decrementResult.completedtask || 0);

        // Save the document
        await decrementResult.save();
        console.log("Second operation successful:", decrementResult);
      } catch (error) {
        console.error("Failed to update user:", error);
        return { message: "Failed to update user" };
      }
    }

    const task = await Task.findOneAndDelete({ _id: id });

    if (task) {
      return res
        .status(200)
        .json({ message: "task has deleted successfully", task });
    } else {
      return res.status(404).json({ message: "Task  not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error..." });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { _id, title, description, dueDate, status, user } = req.body;

    const existingTask = await Task.findById(_id);
    if (!existingTask) {
      return res.status(400).json({ message: "Task does not exist" });
    }

    const previoususer = existingTask.user;
    const previousstatus=existingTask.status;

    let checking=previousstatus===status
   
    
// sttus smae and user same do nothing

//status diffrent   user changes 
//stus same user diffrent do nothing
//sttus diffrent  user diffrent do nothing











    let requser;
    let prevuser;

    if (mongoose.Types.ObjectId.isValid(user)) {
      requser = await User.findById(user);
    }

    if (!requser) {
      // incase oof user change 
      requser = await User.findOne({ name: user });
      prevuser = await User.findOne({ _id: previoususer });

      if (requser && prevuser) {
        try {
          // First operation: Increment assignedtask by 100
          const incrementResult = await User.findOneAndUpdate(
            { _id: requser._id },
            {
              $inc: { assignedtask: 1 }, // Increment assignedtask by 100
            },
            {
              new: true, // Return the updated document
              runValidators: true, // Ensure that the document is validated
            }
          );

          // Recalculate totaltask
          incrementResult.totaltask =
            (incrementResult.assignedtask || 0) +
            (incrementResult.inprocesstask || 0) +
            (incrementResult.completedtask || 0);

          // Save the document
          await incrementResult.save();
          console.log("First operation successful:", incrementResult);

          // Second operation: Decrement assignedtask by 1
          const decrementResult = await User.findOneAndUpdate(
            { _id: prevuser._id },
            {
              $inc: { assignedtask: -1 }, // Decrement assignedtask by 1
            },
            {
              new: true, // Return the updated document
              runValidators: true, // Ensure that the document is validated
            }
          );

          // Recalculate totaltask
          decrementResult.totaltask =
            (decrementResult.assignedtask || 0) +
            (decrementResult.inprocesstask || 0) +
            (decrementResult.completedtask || 0);

          // Save the document
          await decrementResult.save();
          console.log("Second operation successful:", decrementResult);
        } catch (error) {
          console.error("Failed to update user:", error);
          return { message: "Failed to update user" };
        }
      }

      
    }

    if (!requser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if the task exists before attempting to update

    // Prepare update data
    const updateData = {
      title,
      description,
      dueDate,
      status,
      user: requser._id, // Use the ID from the found user
    };

    // Perform the update
    const updatedTask = await Task.updateOne({ _id }, { $set: updateData });

    if (updatedTask.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "Task has been updated successfully" });
    } else {
      return res.status(400).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/date", async (req, res) => {
  try {
    const tasks = await Task.find();

    // const tasks = await Task.find({}, "dueDate");
    // const dueDates = tasks.map((task) => task.dueDate);

    // res.send(dueDates);
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// router.get("/tasks", async (req, res) => {
//   const tasks = await Task.find.populate("user");
//   res.send(tasks);
// });

module.exports = router;
