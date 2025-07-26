import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Mini Components/Input";
import Button from "../Mini Components/Button";
import DropDown from "../Mini Components/DropDown";
import { toast } from "react-toastify";

function UserOperation({ AddingUser = false }) {
  const navigate = useNavigate();
  const allroles = ["user", "manager", "supervisor", "admin"];

  const [data, setdata] = useState({
    ...(AddingUser && { fullName: "" }),
    email: "",
    role: "",
    roles: AddingUser ? allroles : [],
  });
  const getroles = async () => {
    try {
      const url = `http://localhost:5000/user/roles`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resdata = await res.json();
      setdata((prevData) => ({
        ...prevData,
        roles: resdata,
      }));
      setdata.roles(resdata);
    } catch (error) {
      console.error(`error during fetch :${error.message}`);
    }
  };
  useEffect(() => {
    if (!AddingUser) {
      getroles();
    }
  }, [AddingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/user/${
        AddingUser ? "register" : "delete"
      }`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      const resdata = await res.json();

      if (res.status === 200) {
        toast.success(resdata.message);
        navigate("/user/all");
      } else {
        toast.error(resdata.message);
      }
    } catch (error) {
      console.error(`error during fetch :${error.message}`);
      toast.error(`error during fetch :${error.message}`);
    }
  };

  return (
    <div className=" w-[100%] flex justify-center items-center h-screen">
      <div className=" w-[60%] md:w-[60%] lg:w-[30%] xl:w-[30%] border-2 border-primary  rounded py-5">
        <div>
          <h1 className=" text-primary font-bold text-xl flex justify-center items-center mb-3">
            {" "}
            {AddingUser ? "Add User" : "Delete User"}
          </h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          {AddingUser && (
            <Input
              label="FullName"
              name="fullname"
              type="text"
              placeholder="Enter name"
              value={data.fullName}
              isRequired={true}
              onchange={(e) => setdata({ ...data, fullName: e.target.value })}
            />
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter  email"
            value={data.email}
            isRequired={true}
            onchange={(e) => setdata({ ...data, email: e.target.value })}
          />
          <DropDown
            label="Role"
            name="Role"
            options={data.roles} // Example options array["Admin", "Editor", "Viewer"]
            value={data.role}
            placeholder="Select a Role"
            className={`  `}
            Inputclassname={`  `}
            onchange={(e) => setdata({ ...data, role: e.target.value })}
            // onChange={(e) => SetselectedRole(e.target.value)}
          />

          <Button label={AddingUser ? "Add User" : "Delete User"} type="submit">
            {AddingUser ? "Add User" : "Delete User"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserOperation;
