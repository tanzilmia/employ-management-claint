import axios from "axios";
import moment from "moment/moment";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Loadding from "../../component/Loadding";
import { myContext } from "../../contextApi/Authcontext";

const AddedCast = () => {
  const { user, Loading } = useContext(myContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const date = moment().format("DD MM YY");
  const handleCast = (data) => {
    const reason = data.reasons;
    const costAmount = parseInt(data.amount);
    const addCast = {
      reason,
      costAmount,
      date,
      name: user?.name,
      email: user?.email,
    };

    console.log(addCast);
    axios
      .post(`https://employ-server.vercel.app/user/add-cast`, addCast)
      .then((res) => {
        if (res.data.message === "Post created successfully") {
          reset();
        }
        if (res.data.message === "Post is Already Exist") {
          setLoginError("Duplicate Value");
          console.log("duplicate")
        }
      })
      .catch((e) => console.log(e));
  };

  if (Loading) {
    return <Loadding/>
  }

  return (
    <div className="w-full h-[100vh] login_page flex items-center justify-center">
      <div className=" p-10 lg:w-[479px] md:w-[479px] md:h-[497px] lg:h-[497px] w-11/12 h-full">
        <form onSubmit={handleSubmit(handleCast)}>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="font-4xl"> Cost Reasons </span>
            </label>
            <input
              placeholder="Enter  Reasons"
              type="text"
              {...register("reasons", {
                required: "Reasons is required",
              })}
              className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
            />
            {errors.reasons && (
              <p className="text-red-600">{errors.reasons?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="font-4xl">Amount of expenditure </span>
            </label>
            <input
              placeholder="Enter expense(TK)"
              type="text"
              {...register("amount", {
                required: "Expences is required",
                minLength: {
                  value: 2,
                  message: "Expences must be 10 tk or longer",
                },
              })}
              className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
            />
            <label className="label"> </label>
            {errors.amount && (
              <p className="text-red-600">{errors.amount?.message}</p>
            )}
          </div>
          <input
            className=" bg-[#3149b3] hover:cursor-pointer hover:bg-[#874ef1] my-2 text-white py-2 px-4 mt-0 font-bold text-xl w-full rounded-lg"
            value="Add Cast"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddedCast;
