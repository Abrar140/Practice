import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Mini Components/Input";
import Button from "../Mini Components/Button";
import { toast } from "react-toastify";

function Forms({ IsSignInPage = false }) {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    ...(!IsSignInPage && { fullName: "", Role: "" }),
    designation: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/user/${
        IsSignInPage ? "login" : "register"
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
        navigate("/user/login");
      }

      if (res.status === 400) {
        toast.error(resdata.message);
      } else if (!res.ok) {
        throw new Error(`Error:${res.statusText}`);
      } else {
        if (resdata.token) {
          sessionStorage.setItem("user:token", resdata.token);
          sessionStorage.setItem("user:detail", JSON.stringify(resdata.user));

          navigate("/");
          toast.success(resdata.message);
        }
      }
    } catch (error) {
      console.error(`error during fetch :${error.message}`);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[75%] md:w-[70%] lg:w-[30%] xl:w-[30%] border-2 border-primary rounded-[5%] py-[2%]">
        <div className="flex justify-center items-center font-bold">
          {" "}
          Welcome {IsSignInPage ? "" : "Back"}
        </div>
        <div>
          {" "}
          <h1 className="text-primary font-bold text-xl flex justify-center items-center mb-5">
            {" "}
            {!IsSignInPage ? "Sign  Up" : "Sign In "}
          </h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          {!IsSignInPage && (
            <Input
              label="FullName"
              name="fullname"
              type="text"
              placeholder="enter your name"
              value={data.fullName}
              onchange={(e) => setdata({ ...data, fullName: e.target.value })}
            />
          )}
          <Input
            label=" Email address"
            name="email"
            type="email"
            placeholder=" Enter Email address "
            value={data.email}
            onchange={(e) => setdata({ ...data, email: e.target.value })}
          />
          <Input
            label=" Enter your Password"
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onchange={(e) => setdata({ ...data, password: e.target.value })}
          />
          <span
            className="text-red-600 float-right mr-10 mb-3 cursor-pointer"
            onClick={() => navigate(`/user/${IsSignInPage && "forgot"}`)}
          >
            {IsSignInPage && "Forgot Passowrd"}
          </span>

          <Button label={IsSignInPage ? "sign In" : "sign up"} type="submit">
            {IsSignInPage ? "Sign In" : "Sign up"}
          </Button>
        </form>
        <div className="float-right mr-10">
          {IsSignInPage ? "Donot have an account" : "Already have an account"}
          <span
            className="text-primary cursor-pointer"
            onClick={() =>
              navigate(`/user/${IsSignInPage ? "register" : "login"}`)
            }
          >
            {IsSignInPage ? "Sign Up" : "Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Forms;
