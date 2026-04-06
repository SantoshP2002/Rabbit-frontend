// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Product/GenderCollectionSection";
import NewArrivals from "../components/Product/NewArrivals";
import ProductDetails from "../components/Product/ProductDetails";
import ProductGrid from "../components/Product/ProductGrid";
import FeaturedCollection from "../components/Product/FeaturedCollection";
import FeaturesSection from "../components/Product/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productsSlice";
import axios from "axios";
import ProgressLoader from "../components/LoadingScreen";
import { banners } from "../constants";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // fetch Products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );
    // fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-gray-400 font-bold mb-1">
        BESTSELLER
      </h2>
      <div
        className="w-[90%] sm:w-[70%] md:w-[60%] mx-auto h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    [clip-path:polygon(0%_50%,10%_0%,90%_0%,100%_50%,90%_100%,10%_100%)]"
      ></div>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct?._id} />
      ) : (
        <p className="text-center">
          <ProgressLoader content="BEST SELLER Product Loading..." />
        </p>
      )}
      {/* Explore Our Collections */}
      <div className="max-w-7xl mx-auto px-3 py-4 sm:p-4 my-10 rounded-lg">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-800 text-center mb-1">
          <span className="text-rose-400 text-3xl">Explore</span> Our
          Collections
        </h2>
        {/* NEEDLE LINE  */}
        <div
          className="w-[95%] sm:w-[85%] md:w-[80%] mx-auto mb-10 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    [clip-path:polygon(0%_50%,10%_0%,90%_0%,100%_50%,90%_100%,10%_100%)]"
        ></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
            >
              {/* Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-bold">{banner.title}</h2>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition"></div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="container mx-auto ">
        <h2 className="text-3xl text-center font-bold mb-1">
          Top Wear's For Women
        </h2>
        <div
          className="w-[90%] sm:w-[70%] md:w-[60%] mx-auto mb-10 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    [clip-path:polygon(0%_50%,10%_0%,90%_0%,100%_50%,90%_100%,10%_100%)]"
        ></div>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
