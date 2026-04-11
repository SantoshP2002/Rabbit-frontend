import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slice/productsSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import ProductReviews from "./ProductReviews";
import AllReviews from "./AllReviews";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products,
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails({ id: productFetchId }));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct?.images[0].url);
    }
  }, [selectedProduct]);

  // ADD TO CART HANDEL
  const handelAddToCart = () => {
    if (!user) {
      toast.error("Please login to add product to cart.", {
        duration: 2000,
      });
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please Select SIZE & COLOR.", {
        duration: 2000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      }),
    )
      .then(() => {
        toast.success("Product added to cart successfully.", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };
  if (loading) {
    return <p className="text-center mt-10 text-2xl">Loading...</p>;
  }
  if (error) {
    return <p className="text-center mt-10 text-2xl">Error:{error}</p>;
  }
  console.log("selectedProduct", selectedProduct);

  return (
    <div className="px-3 py-4 sm:p-6 w-full overflow-x-hidden">
      {selectedProduct && (
        <div className="max-w-8xl mx-auto bg-white p-8 rounded-lg ">
          <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-3 sm:px-6">
            {/* LEFT SECTION */}
            <div className="md:w-1/2 w-full">
              {/* MAIN IMAGE */}
              <div className="w-full flex justify-center">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full max-w-[320px] sm:max-w-[400px] rounded-2xl object-cover"
                />
              </div>

              {/* MOBILE THUMBNAILS */}
              <div className="flex md:hidden overflow-x-auto gap-3 mt-4 pb-2">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt=""
                    className={`w-16 h-16 rounded-lg cursor-pointer border flex-shrink-0 ${
                      mainImage === image.url
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setMainImage(image.url)}
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP THUMBNAILS */}
            <div className="hidden md:flex flex-col gap-3">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt=""
                  className={`w-20 h-20 rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-1/2">
              {/* NAME */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>

              {/* PRICE */}
              <p className="text-lg text-gray-500 mb-2">
                ₹{selectedProduct.price}
                <span className="line-through text-red-400 text-sm ml-2">
                  ₹{selectedProduct.discountPrice}
                </span>
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                {selectedProduct.description}
              </p>

              {/* COLOR */}
              <div className="mb-4">
                <p className="text-gray-700 text-sm">COLOR :</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedProduct?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border ${
                        selectedColor === color
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div className="mb-4">
                <p className="text-gray-700 text-sm">SIZE :</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedProduct?.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded border text-sm ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm">Quantity :</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                    className="w-8 h-8 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={handelAddToCart}
                disabled={isButtonDisabled}
                className="w-full bg-black text-white py-2 rounded mb-4"
              >
                {isButtonDisabled ? "ADDING..." : "ADD TO CART"}
              </button>

              {/* DETAILS */}
              <div className="mt-6 text-sm text-gray-700">
                <h3 className="font-bold mb-2 text-rose-400">
                  CHARACTERISTIC :
                </h3>
                <p>Brand: {selectedProduct.brand}</p>
                <p>Material: {selectedProduct.material}</p>
              </div>
            </div>
          </div>
          {/* ======================== YOU MAY ALSO LIKE ======================== */}
          <div className="mt-20 ">
            <h2 className="text-2xl text-center font-medium mb-1 ">
              YOU MAY ALSO{" "}
              <span className="font-semibold text-rose-400 text-3xl underline">
                LIKE!
              </span>
            </h2>
            <div
              className="w-[90%] sm:w-[70%] md:w-[60%] mx-auto mb-10 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    [clip-path:polygon(0%_50%,10%_0%,90%_0%,100%_50%,90%_100%,10%_100%)]"
            ></div>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}

      <div>
        <ProductReviews reviews={selectedProduct?.reviews || []} />
      </div>
      <div>
        <AllReviews />
      </div>
    </div>
  );
};

export default ProductDetails;
