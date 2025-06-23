"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import GoogleLoginButton from "./GoogleLoginButton";

// Animation for navbar entrance
const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL
  useEffect(() => {
    fetch(`${baseUrl}/api/session`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <motion.nav
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Replace with image logo if you have a designed one */}
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-[#f56551] via-red-500 to-orange-400 bg-clip-text mix-blend-difference"
        >
          Toura
        </motion.h1>

        {!isLoggedIn && (
          <div className="scale-90 hover:scale-100 transition-transform duration-300">
            <GoogleLoginButton />
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
