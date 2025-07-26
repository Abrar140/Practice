import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleClick = (path) => {
    setActivePath(path);
  };

  const handlelogout = () => {
    try {
      sessionStorage.removeItem("user:token");
      sessionStorage.removeItem("user:detail");
      toast.success("sucessfully log out");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-[100%] h-screen rounded-[4%] shadow-2xl">
      <ul className="text-primary bg-secondary-light flex flex-col gap-4 items-center justify-center ">
        <li className="w-full flex justify-center">
          <Link
            to="/"
            className={
              activePath === "/"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={() => handleClick("/")}
          >
            Homepage
          </Link>
        </li>
        <li className="w-full flex justify-center">
          <Link
            to="/user/add-user"
            className={
              activePath === "/user/add-user"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={() => handleClick("/user/add-user")}
          >
            Add user
          </Link>
        </li>
        <li className="w-full flex justify-center">
          <Link
            to="/user/delete-user"
            className={
              activePath === "/user/delete-user"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={() => handleClick("/user/delete-user")}
          >
            Delete user
          </Link>
        </li>
        <li className="w-full flex justify-center">
          <Link
            to="/user/all"
            className={
              activePath === "/user/all"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={() => handleClick("/user/all")}
          >
            Manage user
          </Link>
        </li>
        <li className="w-full flex justify-center">
          <Link
            to="/task/add-task"
            className={
              activePath === "/user/add-task"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={() => handleClick("/user/add-task")}
          >
            Add Task
          </Link>
        </li>
        <li className="w-full flex justify-center">
          <Link
            to="/task/all"
            className={
              activePath === "/task/all"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={() => handleClick("/task/all")}
          >
            Manage Task
          </Link>
        </li>
        <li className="w-full flex justify-center">
          <Link
            to="/user/profile"
            className={
              activePath === "/user/profile"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={() => handleClick("/user/profile")}
          >
            Profile
          </Link>
        </li>

        <li className="w-full flex justify-center align-bottom">

          <Link
            // to="/user/logout"
            className={
              activePath === "/user/logout"
                ? "bg-primary text-white w-[80%] text-center p-2 rounded-md"
                : "w-[80%] text-center p-2 rounded-md"
            }
            onClick={handlelogout}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
