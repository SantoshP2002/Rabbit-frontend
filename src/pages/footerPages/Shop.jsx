import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetShop } from "../../redux/slice/adminShopSlice";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ProgressLoader from "../../components/LoadingScreen";
import NotFound from "../../components/NotFound";
import { CiUser } from "react-icons/ci";

const Shop = () => {
  const dispatch = useDispatch();
  const { shop, loading } = useSelector((state) => state.adminShop);

  useEffect(() => {
    dispatch(fetchGetShop());
  }, [dispatch]);

  if (!shop) {
    return (
      <NotFound
        title="Shop Not Found"
        message="This shop is not available right now."
      />
    );
  }
  if (loading)
    return (
      <div>
        <ProgressLoader />
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 🔥 Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white flex items-center justify-center">
            {shop?.logo ? (
              <img
                src={shop.logo}
                alt="Shop Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <CiUser className="w-16 h-16 text-gray-400" />
            )}
          </div>

          <h1 className="text-4xl font-bold mt-4 text-gray-800">
            {shop?.name}
          </h1>

          <p className="text-gray-500 mt-2">Welcome to our store 👋</p>
        </motion.div>

        {/* 💎 Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Email */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📧 Email
            </h3>
            <p className="text-gray-600 break-words">{shop?.email}</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📞 Phone
            </h3>
            <p className="text-gray-600">{shop?.phone}</p>
          </motion.div>

          {/* Address */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📍 Address
            </h3>
            <p className="text-gray-600">{shop?.address}</p>
          </motion.div>
        </motion.div>

        {/* ✨ Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-black text-white rounded-2xl p-8 text-center shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Explore Our Collection
          </h2>
          <p className="text-gray-300">
            Discover the latest trends and best deals curated just for you.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
