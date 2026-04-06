import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 sm:px-6 lg:px-8">
      {products?.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link to={`/product/${product._id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* IMAGE */}
              <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden rounded-t-xl">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 font-semibold mt-1 text-sm sm:text-base">
                  ₹{product.price}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
