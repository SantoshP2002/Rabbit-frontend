import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/orderSlice";
import ProgressLoader from "../components/LoadingScreen";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handelRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <ProgressLoader content="Loading your orders..." />;
  }
  if (error) return <p>Error In Cart:{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">MY ORDERS</h2>

      {/* ================= MOBILE VIEW ================= */}
      <div className="sm:hidden space-y-3 px-1">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handelRowClick(order._id)}
              className="bg-white rounded-xl shadow-sm p-3 border space-y-3 cursor-pointer active:scale-[0.98] transition"
            >
              {/* TOP */}
              <div className="flex items-center gap-3">
                <img
                  src={order.orderItems[0].image}
                  alt=""
                  className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    #{order._id.slice(-6)}
                  </p>
                </div>

                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {order.isPaid ? "PAID" : "PENDING"}
                </span>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs">
                <div>
                  <p className="text-gray-500">Items</p>
                  <p className="font-medium">{order.orderItems.length}</p>
                </div>

                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-semibold text-green-600">
                    ₹{order.totalPrice}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-gray-500">Address</p>
                  <p className="text-gray-700 break-words">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-gray-500">Created</p>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-rose-500 bg-gray-50 p-4 rounded-lg animate-pulse">
            YOU HAVE NO ORDERS !
          </div>
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block relative shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handelRowClick(order._id)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-4 px-4">
                  <img
                    src={order.orderItems[0].image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>

                <td className="py-4 px-4 font-medium text-gray-900">
                  #{order._id}
                </td>

                <td className="py-4 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>

                <td className="py-4 px-4">
                  {order.shippingAddress
                    ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                    : "N/A"}
                </td>

                <td className="py-4 px-4">{order.orderItems.length}</td>

                <td className="py-4 px-4">₹{order.totalPrice}</td>

                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {order.isPaid ? "PAID" : "PENDING"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
