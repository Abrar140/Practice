

import React, { useEffect, useState } from "react";
import Create from "./Create";
import "./App.css";
import { getAllTodo, posttodo, updatetodo } from "./apis/Todo"; // Import API functions

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todosData = await getAllTodo();
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async (newTask) => {
    try {
      const newTodo = await posttodo({ task: newTask });
      setTodos([...todos, newTodo]); // Update todos state with newTodo
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleCheckboxChange = async (todoId) => {
    try {
      const updatedTodo = await updatetodo(todoId); // Call API function to update todo
      const updatedTodos = todos.map(todo =>
        todo._id === updatedTodo._id ? { ...todo, done: true } : todo
      );
      setTodos(updatedTodos); // Update todos state with updated todo
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h2>To Do List</h2>
      <Create onAddTodo={handleAddTodo} />
      {todos.length === 0 ? (
        <div>
          <h2>No record found</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleCheckboxChange(todo._id)}
            />
            <label>{todo.task}</label>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
