import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
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
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-center"
      >
        🏪 Shop Management
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* LEFT - Shop Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-md p-5 space-y-5 border"
        >
          <h3 className="text-lg font-semibold">Shop Details</h3>

          {["name", "email", "phone", "address"].map((field) => (
            <div key={field} className="relative">
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                      ? "number"
                      : "text"
                }
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-3 pt-4 pb-2 text-sm bg-transparent border-b-2 border-gray-300 focus:border-black outline-none transition-all"
              />
              <label
                className="absolute left-3 top-2 text-gray-400 text-xs transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-black"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleSave}
            className="w-full bg-black text-white py-2.5 rounded-xl shadow-sm hover:bg-gray-800"
          >
            Save Changes
          </motion.button>
        </motion.div>

        {/* RIGHT - Logo + Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-md p-5 space-y-5 border"
        >
          <h3 className="text-lg font-semibold">Shop Logo</h3>

          <motion.label
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer block hover:border-black transition"
          >
            <p className="text-gray-500 text-sm">Upload Logo</p>
            <input type="file" className="hidden" />
          </motion.label>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { label: "Products", value: stats?.products || 0 },
              { label: "Orders", value: stats?.orders || 0 },
              { label: "Revenue", value: `₹${stats?.revenue || 0}` },
              { label: "Customers", value: stats?.users || 0 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 rounded-xl text-center"
              >
                <p className="text-xs text-gray-500">{item.label}</p>
                <h4 className="text-lg font-bold">{item.value}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopManagement;
