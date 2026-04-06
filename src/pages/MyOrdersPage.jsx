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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 ">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">MY ORDERS</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500 ">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3 ">Image</th>
              <th className="py-2 px-4 sm:py-3 ">Order ID</th>
              <th className="py-2 px-4 sm:py-3 ">Created</th>
              <th className="py-2 px-4 sm:py-3 ">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3 ">Items</th>
              <th className="py-2 px-4 sm:py-3 ">Price</th>
              <th className="py-2 px-4 sm:py-3 ">Status </th>
            </tr>
          </thead>

          <tbody className="">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handelRowClick(order._id)}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  {/* Image */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  {/* order id */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  {/* CreatedAt */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  {/* shippingAddress */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  {/* orderItems */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  {/* TotalPrice */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ₹{order.totalPrice}
                  </td>
                  {/* isPaid */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? " bg-green-100 text-green-700"
                          : "bg-red-100 text-red-500"
                      } px-2 py-1 rounded-full text-sm sm:text-sm font-medium`}
                    >
                      {order.isPaid ? `PAID` : "PENDING"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-rose-500">
                  YOU HAVE NO ORDERS !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
