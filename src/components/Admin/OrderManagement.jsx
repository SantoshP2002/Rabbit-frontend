import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slice/adminOrderSlice";
import ProgressLoader from "../LoadingScreen";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  if (loading)
    return (
      <p>
        <ProgressLoader />
      </p>
    );
  if (error) return <p>Error : {error}</p>;
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left"
      >
        Order Management
      </motion.h2>

      {/* ✅ MOBILE VIEW (CARDS) */}
      <div className="space-y-4 sm:hidden">
        {orders.length > 0 ? (
          orders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white shadow-md rounded-xl p-4 border space-y-3"
            >
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold text-gray-900">
                  #{order._id.slice(-6)}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{order.user.name}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-semibold">₹{order.totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Status</p>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-xs rounded-lg p-2"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleStatusChange(order._id, "Delivered")}
                className="w-full bg-green-500 text-white py-2 rounded-lg text-sm"
              >
                Mark as Delivered
              </motion.button>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-red-500 bg-gray-50 p-6 rounded-xl animate-pulse">
            🚫 No Order Found...
          </div>
        )}
      </div>

      {/* ✅ DESKTOP VIEW (TABLE) */}
      <div className="hidden sm:block overflow-x-auto shadow-md rounded-xl border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, i) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4 px-4 font-medium">
                  #{order._id.slice(-6)}
                </td>
                <td className="p-4">{order.user.name}</td>
                <td className="p-4 font-semibold">
                  ₹{order.totalPrice.toFixed(2)}
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="bg-gray-50 border rounded-lg p-2 text-sm"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleStatusChange(order._id, "Delivered")}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Deliver
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
