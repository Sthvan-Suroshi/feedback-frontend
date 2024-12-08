import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2e61a8] to-[#3e3e65]"
    >
      <div className="text-center text-white">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-9xl font-bold mb-8"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl mb-8"
        >
          Oops! Page not found
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.4
          }}
          className="mb-8"
        >
          <FaSearch className="text-6xl mx-auto" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl mb-8"
        >
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            className="inline-flex items-center bg-white text-[#2e61a8] px-6 py-3 rounded-full font-semibold hover:bg-[#f0f4f8] transition-colors"
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
