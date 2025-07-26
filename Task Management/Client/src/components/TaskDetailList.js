import React, { useState, useEffect } from 'react';

function TaskDetailList() {
  const [taskDetails, setTaskDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/task-detail-view');
        if (!response.ok) {
          throw new Error('Failed to fetch task details');
        }
        const data = await response.json();
        setTaskDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTaskDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Task Detail List</h2>
      <ul>
        {taskDetails.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <p>User: {task.userDetails.name} ({task.userDetails.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskDetailList;
