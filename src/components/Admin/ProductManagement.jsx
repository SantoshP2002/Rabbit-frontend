import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slice/adminProductSlice";
import ProgressLoader from "../LoadingScreen";
import toast from "react-hot-toast";
import ConfirmModal from "../ConfirmModal";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts,
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handelDelete = (id) => {
    if (window.confirm("Are You Sure to Delete This Product..?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading)
    return (
      <div className="text-center p-6">
        <ProgressLoader content="Admin Product Loading..." />
      </div>
    );
  if (error)
    return <div className="text-center p-6 text-red-500">Error:{error}</div>;

  const totalProducts = products.length;

  // HANDLE DELETE USER
  const handleConfirmDelete = () => {
    if (!selectedUserId) return;
    toast.success("Product deleted successfully");
    dispatch(deleteProduct(selectedUserId));
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
      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      <p className="mb-6 text-gray-700 text-xl">
        📦 Total Products:
        <span className="font-semibold text-green-400 text-xl ml-1">
          {totalProducts}
        </span>
      </p>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto shadow-md sm:rounded-xl">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer transition-all duration-200"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>

                  <td className="p-4">₹{product.price}</td>

                  <td className="p-4">{product.sku}</td>

                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                      EDIT
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedUserId(product._id);
                        setIsModalOpen(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-4 py-2 rounded-md"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-red-500 bg-gray-50 rounded-lg shadow-inner animate-pulse"
                >
                  <span className="inline-block text-lg font-medium tracking-wide">
                    🚫 No Products Found...
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className=" bg-white rounded-2xl shadow-lg p-4 border hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* NAME */}
              <div className="mb-2">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold text-gray-900">{product.name}</p>
              </div>

              {/* PRICE */}
              <div className="mb-2">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-green-600 font-semibold">₹{product.price}</p>
              </div>

              {/* SKU */}
              <div className="mb-3">
                <p className="text-sm text-gray-500">SKU</p>
                <p className="text-gray-700 break-all">{product.sku}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="flex-1 text-center bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
                >
                  EDIT
                </Link>

                <button
                  onClick={() => handelDelete(product._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-red-500 bg-gray-50 p-4 rounded-lg animate-pulse">
            🚫 No Products Found...
          </div>
        )}
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

export default ProductManagement;
