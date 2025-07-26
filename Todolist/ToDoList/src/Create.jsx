// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';
// import { posttodo } from './apis/Todo';

// function Create() {
//   const [task, setTask] = useState('');
//   const [message, setMessage] = useState('');

//   const handle = async () => {
//     if (!task.trim()) {
//       setMessage('Task cannot be empty');
//       return;
//     }

//     try {
//       const res = await posttodo({ task: task });
//       console.log(res);
//       // setMessage('Task added successfully');
//       setTask(''); // Clear the input field
//     } catch (error) {
//       console.error('Error in POST todo API:', error);
//       setMessage('Failed to add task');
//     }
//   };

//   return (
//     <div className='create_form'>
//       <input
//         type='text'
//         placeholder='Enter Task'
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//       />
//       <button onClick={handle}>Submit</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Create;


// Create.js

import React, { useState } from "react";

function Create({ onAddTodo }) {
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newTask.trim() === "") return; // Prevent adding empty tasks
      await onAddTodo(newTask); // Call parent function to add todo
      setNewTask(""); // Clear input field after adding task
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new task"
        value={newTask}
        onChange={handleInputChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default Create;












