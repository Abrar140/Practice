







const express = require("express");
const todos = require("../Modles/Todo");
const router = express.Router();

// Define your route handlers
router.get('/', async (req, res) => {
  try {
    const todoList = await todos.find();
    res.json(todoList); // Send the response back to the client
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

router.post('/', async (req, res) => {
  try {
    const task = req.body.task;
    const newTodo = await todos.create({ task: task });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});
router.put('/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { done: true }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Error updating todo' });
  }
});

// Export the router
module.exports = router;

