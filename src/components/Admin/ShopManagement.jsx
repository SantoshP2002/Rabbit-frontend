import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetShop,
  fetchGetShopStats,
  fetchUpdateShop,
} from "../../redux/slice/adminShopSlice";
import toast from "react-hot-toast";

const ShopManagement = () => {
  const dispatch = useDispatch();
  const { shop, stats } = useSelector((state) => state.adminShop);

  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(fetchGetShop());
    dispatch(fetchGetShopStats());
  }, [dispatch]);

  useEffect(() => {
    if (shop) setForm(shop);
  }, [shop]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // alert("Shop details saved!");
    dispatch(fetchUpdateShop(form));
    toast.success("Shop details updated successfully!");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🏪 Shop Management</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT - Shop Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold">Shop Details</h3>

          <input
            type="text"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Shop Name"
            className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300"
          />

          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300"
          />

          <input
            type="number"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300"
          />

          <input
            type="text"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300"
          />

          <button
            onClick={handleSave}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>

        {/* RIGHT - Logo + Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold">Shop Logo</h3>

          <div className="border-2 border-dashed rounded-xl p-6 text-center">
            <p className="text-gray-500">Upload Logo</p>
            <input type="file" className="mt-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-gray-100 rounded-xl text-center">
              <p className="text-sm text-gray-500">Total Products</p>
              <h4 className="text-xl font-bold">{stats?.products || 0}</h4>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl text-center">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h4 className="text-xl font-bold">{stats?.orders || 0}</h4>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl text-center">
              <p className="text-sm text-gray-500">Revenue</p>
              <h4 className="text-xl font-bold">₹{stats?.revenue || 0}</h4>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl text-center">
              <p className="text-sm text-gray-500">Customers</p>
              <h4 className="text-xl font-bold">{stats?.users || 0}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopManagement;
