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
    <div className="p-6 w-full  ">
      {selectedProduct && (
        <div className="max-w-8xl mx-auto bg-white p-8 rounded-lg ">
          <div className="flex flex-col md:flex-row p-2 max-w-5xl mx-auto">
            {/* LEFT THUMBNAILS */}
            <div className="hidden md:flex flex-col pt-12 space-y-4 mr-6 ">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnails ${index}`}
                  className={`w-20 h-20 object bg-cover rounded-lg cursor-pointer border  ${
                    mainImage === image.url ? "border-black" : "border-gray-400"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* MAIN IMAGE */}
            <div className="md:w-1/2">
              <div className="p-12">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-[350px] h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* MOBILE THUMBNAILS */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnails ${index}`}
                  className={`w-20 h-20 object bg-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-400"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="w-[400px] md:1/2 md:ml-10 p-10">
              {/* NAME */}
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              {/* PRICE */}
              <div className="flex flex-row gap-1 text-gray-500 text-xl">
                <p className="text-lg text-gray-600 mb-1 line-through">
                  {selectedProduct.originalPrice &&
                    `${selectedProduct.originalPrice}`}
                </p>
              </div>
              {/* PRICE */}
              <p className="text-xl text-gray-500 mb-2">
                ₹{selectedProduct.price}{" "}
                <span className="line-through text-red-400 text-sm">
                  ₹{selectedProduct.discountPrice}
                </span>
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              {/* COLOR */}
              <div className="mb-4 ">
                <p className="text-gray-700 ">COLOR :</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              {/* COLOR END */}
              {/* SIZE */}
              <div className="mb-4">
                <p className="text-gray-700">SIZE :</p>
                <div className="flex gap-2 mt-2 ">
                  {selectedProduct?.sizes?.map((size) => (
                    <button
                      key={size}
                      className={`relative px-4 py-2 rounded border overflow-hidden z-10 transition-all duration-500 ${
                        selectedSize === size ? "text-white" : "text-black"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="relative z-10">{size}</span>
                      {/* Background Fill Animation */}
                      <span
                        className={`absolute inset-0 bg-black transform transition-transform duration-500 z-0 ${
                          selectedSize === size ? "scale-x-100" : "scale-x-0"
                        } origin-left`}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
              {/* SIZE END */}
              {/* Quantity Start */}
              <div className="mb-6 ">
                <p className="text-gray-700 ">Quantity :</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(quantity - 1, 0))}
                    className="w-8 h-8 bg-gray-200 rounded text-lg flex items-center justify-center"
                  >
                    -
                  </button>

                  <span className="w-6 text-center">{quantity}</span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Quantity End */}
              {/* ADD TO CART BUTTON */}
              <button
                onClick={handelAddToCart}
                disabled={isButtonDisabled}
                className={`relative overflow-hidden group text-black py-2 px-6 rounded w-full mb-4 border border-black font-semibold bg-gray-100 ${
                  isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:text-white">
                  {isButtonDisabled ? "ADDING..." : "ADD TO CART"}
                </span>
                <span className="absolute inset-0 bg-black scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 z-0"></span>
              </button>
              {/* ADD TO CART BUTTON END  */}
              <div className="mt-10 text-gray-700 ">
                <h3 className="text-xl font-bold mb-4 text-rose-400">
                  CHARACTERISTIC :
                </h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1 text-gray-500">BRAND</td>
                      <td className="py-1 ">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-500">MATERIAL</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20 ">
            <h2 className="text-2xl text-center font-medium mb-1 ">
              YOU MAY ALSO{" "}
              <span className="font-semibold text-rose-400 text-3xl underline">
                LIKE!
              </span>
            </h2>
            <div
              className="w-[60%] mx-auto mb-10 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
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
    </div>
  );
};

export default ProductDetails;
