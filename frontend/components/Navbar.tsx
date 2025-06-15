"use client"

import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  
    useEffect(() => {
      fetch('http://localhost:3000/api/session', {  //change this later
        credentials: 'include', 
      })
        .then(res => res.json())
        .then(data => {
          setIsLoggedIn(data.loggedIn)
        })
        .catch(() => setIsLoggedIn(false))
    }, [])
  
    if (isLoggedIn === null) return <div>Loading...</div>
  
  return (
    <div className="p-4 shadow-sm flex items-center justify-between px-5">
      <img src="/logo.svg" alt="Toura Logo" className="h-8 w-auto" />
      <div className={`${isLoggedIn? "hidden" :" flex"} `}>
      <GoogleLoginButton/>
      </div>
    </div>
  );
};

export default Navbar;
