import { motion } from "framer-motion";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center space-y-6">
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-6 h-6 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-6 h-6 bg-orange-500 rounded-full animate-bounce delay-200"></div>
        </motion.div>

        <p className="text-red-500 text-2xl font-bold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
