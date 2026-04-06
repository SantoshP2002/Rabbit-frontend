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

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    image:
      "https://img.freepik.com/free-vector/summer-colection-banner-with-hand-drawn-flowers_1188-312.jpg",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest Trends",
    image:
      "https://strapi-wasabi-bucket-prod-cdn.phot.ai/large_Showcase_New_Arrivals_with_AI_Fashion_Banner_Maker_047bd356df.webp",
  },
  {
    id: 3,
    title: "Electronics",
    subtitle: "Smart Deals",
    image:
      "https://img.freepik.com/free-psd/neon-banner-template-clothing-store-sale_23-2149001696.jpg?semt=ais_rp_progressive&w=740&q=80",
  },
  {
    id: 4,
    title: "Shoes",
    subtitle: "Comfort & Style",
    image:
      "https://img.freepik.com/free-vector/modern-black-friday-sale-banner-template-with-3d-background-red-splash_1361-1877.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 5,
    title: "Watches",
    subtitle: "Luxury Picks",
    image: "https://sylvi.in/cdn/shop/articles/85_1.jpg?v=1676549659",
  },
  {
    id: 6,
    title: "Accessories",
    subtitle: "Complete Your Look",
    image:
      "https://cdn.dribbble.com/userupload/9839613/file/original-d2dfdc4f45b4f795f705834dfc70801d.jpg?resize=752x&vertical=center",
  },
];

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
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center text-gray-400 font-bold mb-1">
        BESTSELLER
      </h2>
      <div
        className="w-[60%] mx-auto h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
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
      <div className="max-w-7xl mx-auto p-4 my-10 rounded-lg">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-800 text-center mb-1">
          <span className="text-rose-400 text-3xl">Explore</span> Our
          Collections
        </h2>
        {/* NEEDLE LINE  */}
        <div
          className="w-[80%] mx-auto mb-10 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
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
                className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
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
          className="w-[60%] mx-auto mb-10 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
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
