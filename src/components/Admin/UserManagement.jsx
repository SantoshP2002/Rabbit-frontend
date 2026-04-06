import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  fetchUser,
  updateUser,
} from "../../redux/slice/adminSlice";
import ConfirmModal from "../ConfirmModal";
import toast from "react-hot-toast";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.admin);

  console.log("Users111:", users);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT FOR ADDING NEW USER
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addUser(formData)).unwrap();

      toast.success("User added successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
    } catch (err) {
      console.log("ERROR:", err);

      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Please Enter Valid Password";

      if (msg === "User Already Exist") {
        toast.error("User already exists, please enter different email");
      } else {
        toast.error(msg);
      }
    }
  };

  // HANDLE ROLE CHANGE
  const handelRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  // HANDLE DELETE USER
  const handleConfirmDelete = () => {
    if (!selectedUserId) return;
    toast.success("User deleted successfully");
    dispatch(deleteUser(selectedUserId));
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  // HANDLE CANCEL DELETE
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {/* ============= ADD NEW USER FORM ============= */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-7 text-rose-500">ADD NEW USER :</h3>
        <form onSubmit={handelSubmit}>
          {/* ============= NAME ============= */}
          <div className="relative mb-10">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handelChange}
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black hover:border-red-400 transition"
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-valid:-top-4 peer-valid:text-xs">
              Enter Full Name
            </label>
          </div>
          {/* ============= EMAIL ============= */}
          <div className="relative mb-10">
            <input
              type="email"
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              name="email"
              value={formData.email}
              onChange={handelChange}
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black hover:border-red-400 transition"
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-valid:-top-4 peer-valid:text-xs">
              Enter Email Address
            </label>
          </div>
          {/* ============= PASSWORD ============= */}
          <div className="relative mb-8">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handelChange}
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black hover:border-red-400 transition"
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-valid:-top-4 peer-valid:text-xs">
              Enter Valid Password
            </label>
          </div>
          {/* ============= USER Role ============= */}
          <div className="mb-4">
            <label className="block text-gray-700">ROLE</label>
            <select
              name="role"
              value={formData.role}
              onChange={handelChange}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 bg-white placeholder-gray-400"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* ============= ADD USER BUTTON ============= */}
          <button
            type="submit"
            className="rounded-md relative overflow-hidden border bg-green-400 border-gray-400 text-white font-semibold py-2 px-4 transition-all duration-300 group"
          >
            <span className="relative z-10 group-hover:text-white transition-all duration-300">
              ADD USER
            </span>

            <span className="absolute bottom-0 left-0 w-full h-0 bg-black group-hover:h-full transition-all duration-300"></span>
          </button>
        </form>
      </div>

      {/* ============= USER List Management ============= */}
      <div>
        <span className="relative inline-block text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 via-rose-500 to-red-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradientMove_4s_ease_infinite]">
          User List
          <span className="absolute left-0 -bottom-1 h-[2px] w-0  bg-gradient-to-r from-purple-500 to-red-500 transition-all duration-500 group-hover:w-full"></span>
        </span>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-sm uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="p-4 font-medium text-gray-900">{user.name}</td>

                  <td className="p-4 text-gray-700">{user.email}</td>

                  <td className="p-2">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handelRoleChange(user._id, e.target.value)
                      }
                      className="p-2 border rounded outline-none"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedUserId(user._id);
                        setIsModalOpen(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-4 py-2 rounded-md"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-2">
          {users?.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-lg p-4 border hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-2">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>

              <div className="mb-2">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700 break-all">{user.email}</p>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-500">Role</p>
                <select
                  value={user.role}
                  onChange={(e) => handelRoleChange(user._id, e.target.value)}
                  className="w-full mt-1 p-2 border rounded outline-none"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSelectedUserId(user._id);
                  setIsModalOpen(true);
                }}
                className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-2 rounded-lg"
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      </div>
      <ConfirmModal
        open={isModalOpen}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserManagement;
