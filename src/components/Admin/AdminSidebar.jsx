import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";
import { clearCart } from "../../redux/slice/cartSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          RABBIT
        </Link>
      </div>

      <h2 className="text-2xl font-medium mb-6 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        {/* USER LOGO */}
        <NavLink
          to="/admin/user"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>USER</span>
        </NavLink>
        {/* PRODUCTS */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>PRODUCTS</span>
        </NavLink>
        {/* ORDERS */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>ORDERS</span>
        </NavLink>

        <NavLink
          to="/admin/shop"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>SHOP</span>
        </NavLink>
      </nav>

      <div className="mt-6">
        <button
          onClick={handelLogout}
          className="relative overflow-hidden border border-green-300 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 group"
        >
          <FaSignOutAlt className="relative z-10 group-hover:text-white transition-all duration-300" />
          <span className="relative z-10 group-hover:text-white transition-all duration-300">
            Logout
          </span>

          {/* Fill background animation */}
          <span className="absolute bottom-0 left-0 w-full h-0 bg-black group-hover:h-full transition-all duration-300"></span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
