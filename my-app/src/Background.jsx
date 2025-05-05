import React from "react";
import { motion } from "framer-motion";
import "./Background.css";

const Background = ({ origin }) => {
  const { top, left } = origin;

  return (
    <motion.div
      className="scaling-square"
      style={{ top, left }}
      initial={{ scale: 0 }}
      animate={{ scale: 10 }}
      transition={{
        duration: 10,
        ease: "easeInOut",
      }}
    />
  );
};

export default Background;
