import React, { useState, useEffect } from "react";
import Input from "../Mini Components/Input";
import DropDown from "../Mini Components/DropDown";
import { useNavigate } from "react-router-dom";

import Button from "../Mini Components/Button";
import { toast } from "react-toastify";

function TaskManagement() {
  const navigate = useNavigate();
  const [allTask, setallTasks] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const allstatus=["Assigned","Inprogress","Completed"];

  const [selectedTask, setselectedTask] = useState({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "",
    user: "",
  });
  const [userMapping, setUserMapping] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [modelopen, setmodelopen] = useState(false);
  const [allusers, setallusers] = useState([]);

  const getallusers = async () => {
    try {
      const url = `http://localhost:5000/user/all`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resdata = await res.json();
      const mapping = resdata.reduce((acc, user) => {
        acc[user._id] = user.name; // Map user ID to user name
        return acc;
      }, {});
      setUserMapping(mapping);
      setallusers(resdata.map((user) => user.name)); // Optional: update allusers if needed
    } catch (error) {
      console.error(`Error during fetch: ${error.message}`);
    }
  };

  const getallTask = async () => {
    try {
      const url = `http://localhost:5000/task/all`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resdata = await res.json();
      setallTasks(resdata);
    } catch (error) {
      console.error(`Error during fetch: ${error.message}`);
    }
  };

  const handledelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this Task?"
    );
    if (confirmDelete) {
      try {
        const url = `http://localhost:5000/task/delete`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const response = await res.json();
        toast.success(response.message);
        getallTask();
      } catch (error) {
        console.error(`Error during fetch: ${error.message}`);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/task/edit`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTask, null, 2),
      });
      const resdata = await res.json();

      if (res.status === 200) {
        toast.success(resdata.message);
        getallTask();
        navigate("/task/all");
      } else {
        toast.error(resdata.message);
      }
    } catch (error) {
      console.error(`error during fetch :${error.message}`);
    }

    setmodelopen(false);
  };

  const handleedit = (_id, title, description, dueDate, status, user) => {
    setselectedTask({
      _id,
      title,
      description,
      dueDate,
      status,
      user,
    });
    setmodelopen(true);
  };

  useEffect(() => {
    getallusers();
  }, [selectedTask]);

  const formatDate = (date) => {
    if (!date) return ""; // Handle cases where date might be null or undefined
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleInputchange = (e) => {
    const { name, type, checked, value } = e.target;

    setselectedTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleclosewindow = () => {
    setmodelopen(false);
  };

  const calculateRemainingTime = (dueDate) => {
    // Define Pakistan time zone offset (UTC+5)
    const pakistanTimeOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

    // Get the current time in UTC
    const nowUTC = new Date();

    // Convert current time to Pakistan time by adding the time zone offset
    const nowInPakistan = new Date(nowUTC.getTime() + pakistanTimeOffset);

    // Create a date object for the due date, convert it to local time in Pakistan
    const due = new Date(dueDate);
    const dueInPakistanTime = new Date(due.getTime() + pakistanTimeOffset); // Convert due date to local time in Pakistan

    // Set due date to end of the day (11:59 PM) in Pakistan time
    dueInPakistanTime.setUTCHours(23, 59, 59, 999); // Ensure using UTC hours here to align with `due.getTime() + pakistanTimeOffset`

    // Calculate the difference in milliseconds
    const difference = dueInPakistanTime - nowInPakistan;

    // If due date is past
    if (difference <= 0) {
      return "Time is up!";
    }

    // Calculate the difference in days and hours
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    // Show hours left when days are 0
    if (days === 0) {
      return `${hours} hours left`;
    } else {
      return `${days} days, ${hours} hours left`;
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedUsers = [...allTask].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        // For non-string values, use numeric comparison
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setallTasks(sortedUsers);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "⬆️" : "⬇️";
    }
    return "⬇️⬆️";
  };

  useEffect(() => {
    getallTask();
  }, []);

  return (
    <div className="w-[100%] h-screen">
      <h1 className="text-primary text-3xl font-bold mb-4 px-20"> All Task</h1>

      {/* <hr className="border-2 border-primary border-[25%]" /> */}
      <div className="w-[100%] px-[5%] h-[90%]    pt-10  flex flex-col  justify-center items-center">
        <table className="border-2 border-primary w-[100%] table-fixed ">
          <thead>
            <tr className="border-2 border-primary bg-primary text-secondary-light w-[100%]">
              <th
                onClick={() => handleSort("title")}
                className="cursor-pointer w-[10%]"
              >
                Title <span>{getSortIcon("title")}</span>
              </th>
              <th
                onClick={() => handleSort("description")}
                className="cursor-pointer  w-[31%] "
              >
                Description <span>{getSortIcon("description")}</span>
              </th>
              <th
                onClick={() => handleSort("dueDate")}
                className="cursor-pointer w-[15%]"
              >
                Due Date<span>{getSortIcon("dueDate")}</span>
              </th>
              <th
                onClick={() => handleSort("status")}
                className="cursor-pointer w-[9%]"
              >
                Completed <span>{getSortIcon("status")}</span>
              </th>
              <th
                onClick={() => handleSort("Remaining days")}
                className="cursor-pointer w-[15%]"
              >
                Remaining Time <span></span>
              </th>
              <th
                onClick={() => handleSort("user")}
                className="cursor-pointer w-[12%]"
              >
                user <span>{getSortIcon("user")}</span>
              </th>

              <th className="w-[8%]">Actions</th>
            </tr>
          </thead>
          <tbody className="align-center justify-center">
            {allTask.map((task, index) => (
              <tr key={index}>
                <td className="text-center">{task.title}</td>
                <td className="text-center break-words whitespace-normal">
                  {task.description}
                </td>
                {/* <td>{task.dueDate}</td> */}
                <p className="text-center">
                  {formatDate(
                    new Date(task.dueDate).toLocaleDateString("en-CA")
                  )}
                </p>
                <td className="text-center">{task.status}</td>
                {/* <td> {today}+{task.dueDate}</td> */}
                <td className="text-center break-words whitespace-normal">
                  {calculateRemainingTime(task.dueDate)}
                </td>

                {/* <td>{task.user ? task.user : "No user"}</td> */}
                <td className="text-center">
                  {userMapping[task.user] || "No user"}
                </td>

                <td className="text-center">
                  <span
                    onClick={() =>
                      handleedit(
                        task._id,
                        task.title,
                        task.description,
                        task.dueDate,
                        task.status,
                        task.user
                      )
                    }
                    className="cursor-pointer"
                  >
                    📝
                  </span>{" "}
                  <span
                    onClick={() => handledelete(task._id)}
                    className="cursor-pointer"
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modelopen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex   items-center justify-center  border-2 border-pink-500">
          <form
            onSubmit={(e) => handleSave(e)}
            className="bg-secondary-light w-[50%] h-[70%] p-4"
          >
            <h2 className="text-2xl  font-bold mb-4 text-primary">
              Edit Task{" "}
              <span
                className="float-right  cursor-pointer"
                onClick={handleclosewindow}
              >
                {" "}
                ❌
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2  mb-2">
              <Input
                label="Title"
                name="title"
                type="text"
                value={selectedTask.title}
                Inputclassname="px-[7%]"
                onchange={handleInputchange}
              />
              <Input
                label="Description"
                name="description"
                type="text"
                value={selectedTask.description}
                Inputclassname="px-[7%]"
                onchange={handleInputchange}
              />

              <Input
                label="Due Date"
                name="dueDate"
                type="date"
                value={
                  selectedTask.dueDate ? selectedTask.dueDate.slice(0, 10) : ""
                }
                min={today}
                Inputclassname="px-[7%]"
                onchange={handleInputchange}
              />

           
              <DropDown
                label="status"
                name="status"
                options={allstatus}
                // {userMapping[task.user] || "No user"}
                // value={selectedTask.partuser}
                value={ selectedTask.status}
                placeholder="Select a status"
                Inputclassname="px-[7%]"
                onchange={handleInputchange}
              />

              <DropDown
                label="User"
                name="user"
                options={allusers}
                // {userMapping[task.user] || "No user"}
                // value={selectedTask.partuser}
                value={userMapping[selectedTask.user] || selectedTask.user}
                placeholder="Select a User"
                Inputclassname="px-[7%]"
                onchange={handleInputchange}
              />
              {/* <DropDown
                label="User"
                name="user"
                options={allusers} // Pass array of user objects
                value={selectedTask.user} // Use user ID
                // value={userMapping[selectedTask.user] || "No user"}

                placeholder="Select a User"
                Inputclassname="px-[7%]"
                objects={true}
                onchange={handleDropDownChange} // Use the updated handler
              /> */}
            </div>
            <div className="mt-5">
              <Button label="save" type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskManagement;
