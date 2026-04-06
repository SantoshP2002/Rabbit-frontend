// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const NotFound = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  buttonText = "Go Back Home",
  redirectPath = "/",
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="h-[600px] flex flex-col items-center justify-center bg-white text-white px-4 relative overflow-hidden">
      {/* 🔥 404 Text */}
      <motion.h1
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-7xl md:text-9xl font-extrabold tracking-widest text-black/90 cursor-pointer"
      >
        404
      </motion.h1>

      {/* ✨ Glow Line */}
      <motion.div
        initial={{ width: "120px" }}
        animate={{ width: hovered ? "220px" : "120px" }}
        transition={{ duration: 0.4 }}
        className="h-1 bg-red-500 my-4 rounded-full shadow-lg shadow-red-500/50"
      />

      {/* 🧠 Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-2 text-center text-black"
      >
        {title}
      </motion.h2>

      {/* 📄 Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-black text-center max-w-md mb-6"
      >
        {message}
      </motion.p>

      {/* 🚀 Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Link
          to={redirectPath}
          className="relative inline-block px-6 py-3 font-semibold rounded-xl bg-red-500 overflow-hidden group"
        >
          <span className="relative z-10 group-hover:text-black">
            {buttonText}
          </span>

          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out"></span>
        </Link>
      </motion.div>

      {/* 🔥 Floating Background */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-20 left-10 w-20 h-20 bg-red-500/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-black/20 rounded-full blur-2xl"
      />
    </div>
  );
};

export default NotFound;
