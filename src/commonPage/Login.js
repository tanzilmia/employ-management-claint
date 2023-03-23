import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { myContext } from "../contextApi/Authcontext";
import './Login.css'

const Login = () => {
  const { setisLogedind, setLoading } = useContext(myContext);
  const neviget = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");

  const handlLogin = (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;

    const userinfo = {
      email,
      password,
    };

    axios
      .post(`https://employ-server.vercel.app/auth/login`, userinfo)
      .then((res) => {
        switch (res.data.message) {
          case "Login Successful":
            const token = res.data.data;
            localStorage.setItem("token", token);
            setisLogedind(true);
            neviget(from, { replace: true });
            
            break;
          case "password not Match":
            setLoginError(res.data.message);
            break;
          case "user not Valid":
            setLoginError(res.data.message);   
            break;
          default:
          // handle other cases or errors
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="overlayImg">
      
      <div className="w-full  login_page flex items-center justify-center">
      <div className=" py-24 lg:w-[479px] md:w-[570px] md:h-[500px] lg:h-[600px] w-11/12 h-full">
      <h2 className="text-center  font-bold text-4xl text-white">Login Now</h2>
        <form onSubmit={handleSubmit(handlLogin)}>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              placeholder="Enter Your Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
            />
            <label className="label"> </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className=" bg-[#5139a7] hover:cursor-pointer hover:bg-[#6b41af] my-2 text-white  py-2 px-4 mt-0 font-bold text-xl w-full rounded-lg"
            value="Login"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p className="my-1 text-red-200 font-medium">
        CREATE A NEW ACCOUNT ?{" "}
          <Link to="/register" className="text-red-400 font-medium">
            Register Now
          </Link>{" "}
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
