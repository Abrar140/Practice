import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default CSS
import TaskChart from "./TaskChart";

function DashBoard() {
  const [date, setDate] = useState(new Date());
  const [dueDates, setDueDates] = useState([]);
  const [pendingworks, setPendingWorks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const url = `http://localhost:5000/task/date`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const tasks = await res.json();
      setDueDates(tasks.map((task) => new Date(task.dueDate)));

      // // Sort tasks by dueDate in ascending order
      // const sortedTasks = tasks.sort(
      //   (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      // );

      // // Extract due dates from sorted tasks
      // const extractedDueDates = sortedTasks.map((task) => new Date(task.dueDate));

      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      // Filter tasks to include only those with due dates within the next 7 days
      const filteredTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= nextWeek;
      });

      // Sort filtered tasks by dueDate in ascending order
      const sortedTasks = filteredTasks.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );

      // Extract due dates from sorted tasks
      const extractedDueDates = sortedTasks.map(
        (task) => new Date(task.dueDate)
      );

      setPendingWorks(sortedTasks);
    } catch (error) {
      console.error(`Error during fetch: ${error.message}`);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const isDueDate = dueDates.some(
        (dueDate) => dueDate.toDateString() === date.toDateString()
      );
      const isToday = new Date().toDateString() === date.toDateString();
      const isPast = date < new Date();
      const isFuture = date > new Date();

      if (isToday && isDueDate) {
        return "today-due-date";
      } else if (isDueDate && isFuture) {
        return "future-due-date";
      } else if (isDueDate && isPast) {
        return "past-due-date";
      }
    }
    return undefined;
  };

  const styles = `
  .react-calendar {
    border: 1px solid #dcdcdc; /* Default border style */
    border-radius: 0.375rem; /* Tailwind rounded-lg */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Tailwind shadow-lg */
  }

  .react-calendar__tile {
    position: relative;
    border-radius: 50%; /* Make the tile circular */
    width: 2.5rem; /* Set the width of the tile */
    height: 2.5rem; /* Set the height of the tile */
    display: flex; /* Flexbox to center the content */
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    line-height: 1.25rem; /* Adjust line-height for better text positioning */
  }

  .react-calendar__tile.today-due-date {
    background-color: ${"#76C9FF"}; /* Tailwind color: primary.light */
    color: ${"#FFFFFF"}; /* Tailwind color: secondary.light */
  }

  .react-calendar__tile.future-due-date {
    background-color: ${"#008000"}; /* Tailwind color: tertiary.dark (green) */
    color: ${"#FFFFFF"}; /* Tailwind color: secondary.light */
  }

  .react-calendar__tile.past-due-date {
    background-color: ${"#FF0000"}; /* Tailwind color: tertiary.DEFAULT (red) */
    color: ${"#FFFFFF"}; /* Tailwind color: secondary.light */
  }

  .react-calendar__tile:hover {
    filter: brightness(90%); /* Optional: slight darkening on hover */
  }

  .react-calendar__tile--active {
    background-color: rgba(0, 0, 0, 0.1); /* Optional: light background for active date */
  }

  .react-calendar__tile--now {
    border: 1px solid #000; /* Optional: border for current date */
  }
`;

  return (
    <div className="p-6 h-screen">
      <div className="w-[25%] bg-primary h-screen">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <style>{styles}</style> {/* Inject the styles into the component */}
        <div className="relative">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={getTileClassName}
            className="react-calendar"
          />
        </div>
        <div>
          <h1>Upcoming Works</h1>
          <div>
            {pendingworks.map((task, index) => (
              <div key={index}>
                <p>
                  {task.title} ---
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
