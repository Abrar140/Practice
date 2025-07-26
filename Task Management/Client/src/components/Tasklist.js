import React, { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/task-view', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'cors',
        
        },);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> (by {task.userDetails.name} - {task.userDetails.email}) - Completed: {task.completed.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
