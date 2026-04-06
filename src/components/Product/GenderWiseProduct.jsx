import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const GenderWiseProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const gender = queryParam.get("gender");

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products?collection=all&gender=${gender}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [gender]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center">{gender} Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 sm:p-20">
        {product.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="w-full sm:h-96 object-cover hover:scale-110 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xs sm:text-lg text-gray-800">{item.name}</h2>

              {/* Price */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-red-500 font-bold text-lg">
                  ₹{item.price}
                </span>

                {item.discountPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.discountPrice}
                  </span>
                )}
                <span className="text-green-600">{item.gender}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderWiseProduct;
