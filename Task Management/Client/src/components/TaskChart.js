import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskChart = ({ data }) => {
  const chartData = {
    labels: data.map((task) => task.title),
    datasets: [
      {
        label: 'Tasks Due in the Next 7 Days',
        data: data.map((task) => new Date(task.dueDate).getDate()),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Deadlines (Day of the Month)',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TaskChart;
