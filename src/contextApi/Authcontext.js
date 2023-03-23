import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const myContext = createContext();
const Authcontext = ({ children }) => {
  const [user, setuser] = useState(null);
  const [islogin, setisLogedind] = useState(false);
  const [Loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // get user info

  useEffect(() => {
    if (token || islogin) {
      axios
        .post(`https://employ-server.vercel.app/auth/user-info`, { token })
        .then((res) => {
          if (res.data.message === "successfull") {
            setuser(res.data.data);
            setLoading(false);
          }
        })
        .catch((e) => console.log(e));
    } else {
      setLoading(false);
    }
  }, [token, islogin]);

  const logout = () => {
    localStorage.removeItem("token");
    setLoading(true);
    setisLogedind(false);
    setuser(null);
  };

  const contextValue = {
    header,
    setisLogedind,
    setLoading,
    logout,
    Loading,
    user
  };

  return (
    <myContext.Provider value={contextValue}> {children} </myContext.Provider>
  );
};

export default Authcontext;
