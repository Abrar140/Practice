import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Mini Components/Input";
import Button from "../Mini Components/Button";
import DropDown from "../Mini Components/DropDown";
import { toast } from "react-toastify";

const TaskOperation = ({ AddingTask = false }) => {
  const [users, setUsers] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate(); // Define the navigate function using useNavigate
  const [data, setdata] = useState({
    title: "",
    dueDate: "",
    description: "",
    partuser: "",
    user: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/user/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      const userOptions = data.map((user) => ({
        value: user._id,
        label: user.name,
      }));

      setUsers(userOptions);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          user: data.user,
          dueDate: data.dueDate,
          description: data.description,
        }),
      });
      const resdata = await res.json();

      if (res.status === 200) {
        toast.success(resdata.message);

        navigate("/task/all");
      } else {
        toast.error(resdata.message);
      }
    } catch (error) {
      console.error(`error during fetch :${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[60%] md:w-[60%] lg:w-[30%] xl:w-[30%] border-2 border-primary bg-red rounded py-5">
        <div>
          <h1 className="text-primary font-bold text-xl flex justify-center items-center mb-3">
            {AddingTask ? "Add Task" : "Delete Task"}
          </h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Title"
            name="text"
            type="text"
            placeholder="Enter title"
            value={data.title}
            isRequired={true}
            onchange={(e) => setdata({ ...data, title: e.target.value })}
          />

          <Input
            label="Due Date"
            name="due date"
            type="date"
            placeholder="Enter due date"
            value={data.dueDate}
            isRequired={true}
            min={today}
            onchange={(e) => setdata({ ...data, dueDate: e.target.value })}
          />
          <Input
            label="Description"
            name="description"
            type=""
            placeholder="Enter title"
            value={data.description}
            isRequired={true}
            onchange={(e) => setdata({ ...data, description: e.target.value })}
          />
          <DropDown
            label="Assign User"
            name="user"
            options={users} // Example options array["Admin", "Editor", "Viewer"]
            value={data.user}
            placeholder="Select a user"
            className={`  `}
            objects={true}
            // Inputclassname="px-[7%]"
            onchange={(e) => setdata({ ...data, user: e.target.value })}
          />

          <Button label={AddingTask ? "Add Task" : "Delete Task"} type="submit">
            {AddingTask ? "Add Task" : "Delete Task"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskOperation;

//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     title: "",
//     dueDate: "",
//     description: "",
//     user: "",  // This will store the selected user's ID
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await fetch("http://localhost:5000/user/all", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();

//       const userOptions = data.map((user) => ({
//         value: user._id,
//         label: user.name,
//       }));

//       setUsers(userOptions);
//     };

//     fetchUsers();
//   }, []);
