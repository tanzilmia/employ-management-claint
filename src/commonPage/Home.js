import React, { useContext } from "react";
import Loadding from "../component/Loadding";
import { myContext } from "../contextApi/Authcontext";
import './Home.css'

const Home = () => {
  const {  user, Loading } = useContext(myContext);
  if (Loading) {
    return <Loadding/>
  }
  return (
    <div className="homeOverlay h-screen">
      <h2 className="text-center text-3xl  text-white ">
         {user ? `Welcome Back  ${user?.name}` : "Home Page"}{" "}
      </h2>

      

    </div>
  );
};

export default Home;
