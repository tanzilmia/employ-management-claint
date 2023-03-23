import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Loadding from '../../component/Loadding';
import { myContext } from '../../contextApi/Authcontext';

const EdetePost = () => {
    const edetedData = useLoaderData()
    const {Loading}= useContext(myContext)
    const naviget = useNavigate()
    const { reason,costAmount,_id} = edetedData?.posts
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const [loginError, setLoginError] = useState("");
    
      const handleCastEdete = (data) => {
        
        const reason = data.reasons;
        const EdetedcostAmount = parseInt(data.amount);
    
        const edetedInfo = {
            reason,
            EdetedcostAmount,
            _id
        };


        axios.put(`https://employ-server.vercel.app/admin/edite-post`, edetedInfo)
        .then(res => {
            if(res.data.message === "Update Complete"){
                naviget('/adminpannel') 
            }
        })
        .catch(e => console.log(e))
          
      };

      if (Loading) {
        return <Loadding/>
      }

    return (
        <div>
            <h2> Edete Post </h2>
            <div className="w-full h-[100vh] login_page flex items-center justify-center">
        <div className=" p-10 lg:w-[479px] md:w-[479px] md:h-[497px] lg:h-[497px] w-11/12 h-full">
          <form onSubmit={handleSubmit(handleCastEdete)}>
            <div className="form-control w-full">
              <label className="label">
                {" "}
                <span className="font-4xl"> Cost Reasons </span>
              </label>
              <input
                placeholder="Enter  Reasons"
                defaultValue={reason}
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
                <span className="font-4xl">Amount of expenditure  </span>
              </label>
              <input
                placeholder="Enter Expense(TK)"
                type="text"
                defaultValue={costAmount}
                {...register("amount", {
                  required: "Expense is required",
                  minLength: {
                    value: 2,
                    message: "Expense must be 10 tk or longer",
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
              className=" bg-[#17468b] hover:cursor-pointer text-white hover:bg-[#5248dd] my-2  py-2 px-4 mt-0 font-bold text-xl w-full rounded-lg"
              value="Edit Cast"
              type="submit"
            />
            <div>
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </form>
        </div>
      </div>
     
        </div>
    );
};

export default EdetePost;