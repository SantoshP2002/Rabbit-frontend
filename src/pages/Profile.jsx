import React, { useEffect } from "react";
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
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-xl rounded-2xl p-6 transition duration-300 hover:shadow-2xl">
            {/* USER NAME */}
            <h1 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-wide">
              {user?.name}
            </h1>

            {/* EMAIL */}
            <p className="text-base text-gray-500 mb-6 uppercase">{user?.email}</p>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handelLogout}
              className="relative overflow-hidden w-full border border-gray-800 text-gray-800 font-semibold py-2 px-4 rounded-lg group"
            >
              <span className="absolute inset-0 bg-gray-900 transition-all duration-500 ease-in-out transform -translate-x-full group-hover:translate-x-0 z-0 rounded-lg"></span>
              <span className="relative z-10 group-hover:text-white transition duration-300">
                Logout
              </span>
            </button>
          </div>

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
