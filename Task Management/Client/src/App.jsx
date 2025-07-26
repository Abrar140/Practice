import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import DashBoard from "./components/DashBoard";
import Navbar from "./components/Navbar";
import Forms from "./components/Form";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserOperation from "./components/UserOperation";
import UserMangement from "./components/UserMangement";
import TaskOperation from "./components/TaskOperation";
import TaskManagement from "./components/TaskManagement";
import Profile from "./components/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(
        !!sessionStorage.getItem("user:detail") &&
          !!sessionStorage.getItem("user:token")
      );
    };

    const intervalId = setInterval(checkLoginStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="App flex h-screen">
        {/* Conditionally render Navbar */}
        {isLoggedIn && (
          <div className="w-[15%] h-full">
            <Navbar />
          </div>
        )}

        {/* Main content */}
        <div
          className="w-[85%] h-full"
          // className={`w-[${isLoggedIn ? "85%" : "100%"}] h-full overflow-auto`}
        >
          <Routes>
            {/* Public routes */}
            <Route
              path="/user/register"
              element={<Forms IsSignInPage={false} />}
            />
            <Route path="/user/login" element={<Forms IsSignInPage={true} />} />
            <Route path="/user/forgot" element={<ForgotPassword />} />

            <Route
              path="/"
              element={<ProtectedRoutes element={<DashBoard />} />}
            />
            <Route
              path="/user/add-user"
              element={
                <ProtectedRoutes
                  element={<UserOperation AddingUser={true} />}
                />
              }
            />
            <Route
              path="/user/delete-user"
              element={
                <ProtectedRoutes
                  element={<UserOperation AddingUser={false} />}
                />
              }
            />
            <Route
              path="/user/all"
              element={<ProtectedRoutes element={<UserMangement />} />}
            />
            <Route
              path="/task/add-task"
              element={
                <ProtectedRoutes
                  element={<TaskOperation AddingTask={true} />}
                />
              }
            />
            <Route
              path="/task/all"
              element={<ProtectedRoutes element={<TaskManagement />} />}
            />
              <Route
              path="/user/profile"
              element={
                <ProtectedRoutes element={<Profile />} />
              }
            />
            {/*
            <Route
              path="/user/all"
              element={
                isLoggedIn ? (
                  <ProtectedRoutes element={<ManageUser />} />
                ) : (
                  <Navigate to="/user/login" />
                )
              }
            />
            <Route
              path="/user/add-task"
              element={
                isLoggedIn ? (
                  <ProtectedRoutes element={<AddTask AddingTask={true} />} />
                ) : (
                  <Navigate to="/user/login" />
                )
              }
            />
            <Route
              path="/task/all"
              element={
                isLoggedIn ? (
                  <ProtectedRoutes element={<ManageTask />} />
                ) : (
                  <Navigate to="/user/login" />
                )
              }
            />*/}
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
