"use client";

import React from "react";
import { motion ,Variants} from "framer-motion";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

const fadeInUp :Variants= {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  const router=useRouter()
  const handleClick=()=>{
    router.push('/createTrip')
  }
  return (
    <div className="flex items-center justify-center flex-col gap-8 px-6 md:px-40 min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white">
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="font-extrabold text-[36px] md:text-[48px] text-center leading-tight"
      >
        <span className="bg-gradient-to-r from-[#f56551] via-[#fc9272] to-[#fcbf49] bg-clip-text text-transparent">
          Your AI-powered travel buddy.
        </span>
        <br />
        Discover hidden gems, and get smart insights.
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="text-lg md:text-xl text-gray-300 text-center max-w-2xl"
      >
        "Explore smarter. Travel better."
      </motion.p>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.4}
      >
        <Button variant="secondary" onClick={handleClick}>Get Started For Free</Button>
      </motion.div>
    </div>
  );
};

export default Home;
