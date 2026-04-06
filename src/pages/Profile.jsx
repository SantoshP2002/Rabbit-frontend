import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { clearCart } from "../redux/slice/cartSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handelLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
    toast.success("Logout");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="w-full md:w-1/3 lg:w-1/4 bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition-all duration-300"
          >
            {/* USER NAME */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 tracking-wide">
              {user?.name}
            </h1>

            {/* EMAIL */}
            <p className="text-sm text-gray-500 mb-5 break-all">
              {user?.email}
            </p>

            {/* LOGOUT BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handelLogout}
              className="relative overflow-hidden w-full border border-gray-800 text-gray-800 font-medium py-2.5 px-4 rounded-xl group"
            >
              {/* ANIMATION BG */}
              <span className="absolute inset-0 bg-gray-900 transition-all duration-500 ease-in-out transform -translate-x-full group-hover:translate-x-0 z-0 rounded-xl"></span>

              {/* TEXT */}
              <span className="relative z-10 group-hover:text-white transition duration-300">
                Logout
              </span>
            </motion.button>
          </motion.div>

          {/* RIGHT SECTION: Orders Table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
