import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../contextApi/Authcontext";
import {toast } from 'react-toastify';
import './Register.css'

const Register = () => {
  const {setLoading} = useContext(myContext)
  const neviget = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerError, setregisterError] = useState("");

  const handleRegister = (data) => {
    setLoading(true)
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const role = "null";
    const Employid = parseInt(data.employid)
    

    console.log(typeof(Employid));


    
    const userinfos = {
      name,
      email,
      password,
      role,
      Employid
    }


    axios.post(`https://employ-server.vercel.app/auth/register`, userinfos)
    .then(res => {
      switch (res.data.message) {
        case "success":
          toast("Created user successfully")
          neviget("/login");
          break;
        case "Email Is Already Used":
          setregisterError(res.data.message);
          break;
        default:
          // handle other cases or errors
      }
      
    })
    .catch((e) => console.log(e))



  };

  return (
   <div className="RegisterOverlay h-screen">
     <div className="w-full  login_page flex items-center justify-center ">
      <div className=" p-10 lg:w-[479px] md:w-[479px] md:h-[497px] lg:h-[497px] w-11/12 h-full">
        <h2 className="text-3xl text-center font-bold text-white">Register Now</h2>
        
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="font-4xl">Name</span>
            </label>
            <input
              placeholder="Enter Your Name"
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full py-2 px-4 my-0 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="font-4xl">Email</span>
            </label>
            <input
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full py-2 px-4 my-0 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="font-4xl">Employ Id</span>
            </label>
            <input
              placeholder="Enter Your EmployId"
              type="text"
              {...register("employid", {
                required: "EmployId Address is required",
              })}
              className="input input-bordered w-full py-2 px-4 my-0 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="font-4xl">Password</span>
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
              className="input input-bordered w-full py-2 px-4 my-0 rounded-lg"
            />
            <label className="label"> </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className=" bg-[#5139a7] hover:cursor-pointer hover:bg-[#6b41af] my-2 text-white  py-2 px-4 mt-0 font-bold text-xl w-full rounded-lg"
            value="Register"
            type="submit"
          />
          <div>
            {registerError && <p className="text-red-600">{registerError}</p>}
          </div>
        </form>
        <p className="my-1 text-red-200 font-medium ">Already Have an account ? <Link to = '/login' className="text-red-400 font-medium">Login Now</Link> </p>
      </div>
    </div>
   </div>
  );
};

export default Register;