import React, { useState, useEffect } from "react";
import Input from "../Mini Components/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../Mini Components/Button";

function ForgotPassword() {
  const [data, setdata] = useState({
    Email: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    if (data.NewPassword === data.ConfirmPassword) {
      try {
        const url = `http://localhost:5000/user/forgot`;
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
          //   navigate("/user/login");
          navigate(`/user/login`);
        } else {
          toast.error(resdata.message);
        }
      } catch (error) {
        console.error(`error during fetch :${error.message}`);
        toast.error(error.message);
      }
    } else {
      toast.warning("New and Confirm Passwords are not same ");
      //   alert("New and Confirm Passwords are not same ");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-[60%] md:w-[60%] lg:w-[30%] xl:w-[30%] border-2 border-primary bg-red rounded py-5">
        <div>
          <h1 className=" text-primary font-bold text-xl flex justify-center items-center mb-3">
            Forgot Password
          </h1>
        </div>
        <form onSubmit={(e) => handleForgot(e)}>
          <Input
            label=" Email address"
            name="email"
            type="email"
            placeholder=" Enter Email address "
            value={data.Email}
            isRequired={true}
            onchange={(e) => setdata({ ...data, Email: e.target.value })}
          />
          <Input
            label=" Enter your  New Password"
            name="Newpassword"
            type="password"
            placeholder="New Password"
            value={data.NewPassword}
            isRequired={true}
            onchange={(e) => setdata({ ...data, NewPassword: e.target.value })}
          />
          <Input
            label=" Confirm  your  New Password"
            name=" Confirmpassword"
            type="password"
            placeholder=" Confirm Password"
            value={data.ConfirmPassword}
            isRequired={true}
            onchange={(e) =>
              setdata({ ...data, ConfirmPassword: e.target.value })
            }
          />

          <span
            className=" float-left mr-10 mb-3 ml-5 cursor-pointer"
            onClick={() => navigate(`/user/login`)}
          >
            👈Back
          </span>
          <Button label={"Save"} type="submit">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
