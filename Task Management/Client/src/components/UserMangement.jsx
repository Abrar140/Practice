import React, { useState, useEffect } from "react";
import Input from "../Mini Components/Input";
import DropDown from "../Mini Components/DropDown";
import { useNavigate } from "react-router-dom";

import Button from "../Mini Components/Button";
import { toast } from "react-toastify";

function UserMangement() {
  const [allusers, setallusers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [modelopen, setmodelopen] = useState(false);

  const [selecteduser, setselecteduser] = useState({
    name: "",
    email: "",
    role: "",
    assignedtask:"",
    inprocesstask: "",
    completedtask: "",
    totaltask: "",

  });
  const navigate = useNavigate();

  const allroles = ["user", "manager", "supervisor", "admin"];

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
      setallusers(resdata);
    } catch (error) {
      console.error(`Error during fetch: ${error.message}`);
    }
  };

  const handledelete = async (email, role) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const url = `http://localhost:5000/user/delete`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, role }),
        });

        const resdata = await res.json();
        if(resdata.status===200){
          toast.success(resdata.message);

        }else{
          toast.error(resdata.message);

        }
        getallusers();
      } catch (error) {
        console.error(`Error during fetch: ${error.message}`);
      }
    }
  };
  const handleedit = (
    name,
    email,
    role,
    assignedtask,
    inprocesstask,
    completedtask,
    totaltask
  ) => {
    setselecteduser({
      name,
      email,
      role,
      assignedtask,
      inprocesstask,
      completedtask,
      totaltask,
    });
    setmodelopen(true);
  };

  const handleInputchange = (e) => {
    const { name, value } = e.target;

    setselecteduser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log("Updated selecteduser:", selecteduser);
  }, [selecteduser]);

  const handleclosewindow = () => {
    setmodelopen(false);
  };
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/user/edit`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selecteduser, null, 2),
      });
      const resdata = await res.json();

      if (res.status === 200) {
        toast.success(resdata.message);
      } else {
        toast.warning(resdata.message);
      }
      getallusers();
    } catch (error) {
      console.error(`error during fetch :${error.message}`);
    }

    setmodelopen(false);
  };
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedUsers = [...allusers].sort((a, b) => {
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

    setallusers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "⬆️" : "⬇️";
    }
    return "⬇️⬆️";
  };

  useEffect(() => {
    getallusers();
  }, []);

  return (
    <div className="w-[100%] h-screen">
      <h1 className="text-primary text-3xl font-bold mb-4 px-20"> All Users</h1>

      {/* <hr className="border-2 border-primary border-[25%]" /> */}
      <div className="w-[100%] px-[5%] h-[90%]    pt-10  flex flex-col  justify-center items-center">
        <table className="border-2 border-primary w-[100%] table-fixed ">
          <thead>
            <tr className="border-2 border-primary bg-primary text-secondary-light w-[100%]">
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer w-[15%]"
              >
                Full Name <span>{getSortIcon("name")}</span>
              </th>
              <th
                onClick={() => handleSort("email")}
                className="cursor-pointer  w-[30%] "
              >
                Email <span>{getSortIcon("email")}</span>
              </th>
              <th
                onClick={() => handleSort("role")}
                className="cursor-pointer w-[15%]"
              >
                Role <span>{getSortIcon("role")}</span>
              </th>
              <th
                onClick={() => handleSort("assignedtask")}
                className="cursor-pointer w-[10%]"
              >
                Assigned  Task <span>{getSortIcon("assignedtask")}</span>
              </th>
              <th
                onClick={() => handleSort("inprocesstask")}
                className="cursor-pointer w-[10%]"
              >
                Inprocess Task <span>{getSortIcon("inprocesstask")}</span>
              </th>
              <th
                onClick={() => handleSort("completedtask")}
                className="cursor-pointer w-[10%]"
              >
                Completed Task <span>{getSortIcon("completedtask")}</span>
              </th>
              <th
                onClick={() => handleSort("totaltask")}
                className="cursor-pointer w-[10%]"
              >
                Total Task <span>{getSortIcon("totaltask")}</span>
              </th>
              <th className="w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allusers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.assignedtask}</td>

                <td>{user.inprocesstask}</td>

                <td>{user.completedtask}</td>
                <td>{user.totaltask}</td>
                <td>
                  <span
                    onClick={() =>
                      handleedit(
                        user.name,
                        user.email,
                        user.role,
                        user.assignedtask,
                        user.inprocesstask,
                        user.completedtask,
                        user.totaltask
                      )
                    }
                    className="cursor-pointer"
                  >
                    📝
                  </span>{" "}
                  <span
                    onClick={() => handledelete(user.email, user.role)}
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
              Edit User{" "}
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
                label=" Name"
                name="name"
                type="text"
                value={selecteduser.name}
                Inputclassname="px-[7%]"
                onchange={handleInputchange}
              />
              <Input
                label=" Email"
                name="email"
                type="email"
                value={selecteduser.email}
                Inputclassname="px-[7%]"
                readOnly={true}

                // onchange={handleInputchange}
              />
              <DropDown
                label="Role"
                name="role"
                options={allroles} // Example options array["Admin", "Editor", "Viewer"]
                value={selecteduser.role}
                placeholder="Select a Role"
                className={`  `}
                Inputclassname="px-[7%]"
                onchange={handleInputchange}
              />
                  <Input
                label="assignedtask"
                name="assignedtask"
                type="text"
                value={selecteduser.assignedtask}
                Inputclassname="px-[7%]"
                readOnly={true}
              />
              <Input
                label="inprocesstak"
                name="inprocesstask"
                type="text"
                value={selecteduser.inprocesstask}
                Inputclassname="px-[7%]"
                readOnly={true}
              />
              <Input
                label="completedtask"
                name="completedtask"
                type="text"
                value={selecteduser.completedtask}
                Inputclassname="px-[7%]"
                readOnly={true}
              />
              <Input
                label="totaltask"
                name="totaltask"
                type="text"
                value={selecteduser.totaltask}
                Inputclassname="px-[7%]"
                readOnly={true}
              />
            </div>
            <div className="mt-5">
              {/* <Button label="cancel"  /> */}
              <Button label="save" type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserMangement;
