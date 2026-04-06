// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = ({ isModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [phoneError, setPhoneError] = useState("");
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      if (!isModal) {
        navigate("/");
      }
    }
  }, [cart, navigate, isModal]);

  // Handle Create checkout API Call
  const handelCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        }),
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); // Set checkout ID  if checkout was successful
      }
    }
  };

  // Handle Payment Success API Call
  const handelPaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      await handleFinalizeCheckout(checkoutId); // finalize checkout if payment is successful
      toast.success("✅ Payment Successful!");
    } catch (error) {
      toast.error("Something went wrong!", error);
    }
  };

  // Handle Finalize Checkout API Call
  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `
        ${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      navigate("/order-confirmation");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading Cart ...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-10 px-3 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg sm:shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight">
            Checkout
          </h2>

          <form onSubmit={handelCreateCheckout}>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">
              Contact Details
            </h3>

            {/* EMAIL */}
            <div className="mb-4 sm:mb-5">
              <label className="text-xs sm:text-sm text-gray-500">Email</label>
              <input
                type="email"
                value={user ? user.email : ""}
                disabled
                className="w-full mt-1 p-2.5 sm:p-3 rounded-xl border bg-gray-100 text-gray-500 text-sm sm:text-base"
              />
            </div>

            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">
              Delivery
            </h3>

            {/* NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
              <input
                type="text"
                placeholder="First Name"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="p-2.5 sm:p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none text-sm sm:text-base"
                required
              />

              <input
                type="text"
                placeholder="Last Name"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="p-2.5 sm:p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none text-sm sm:text-base"
                required
              />
            </div>

            {/* ADDRESS */}
            <input
              type="text"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2.5 sm:p-3 mb-4 sm:mb-5 rounded-xl border focus:ring-2 focus:ring-black outline-none text-sm sm:text-base"
              required
            />

            {/* CITY + PIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="p-2.5 sm:p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none text-sm sm:text-base"
                required
              />

              <input
                type="number"
                placeholder="PIN Code"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="p-2.5 sm:p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none text-sm sm:text-base"
                required
              />
            </div>

            {/* COUNTRY */}
            <input
              type="text"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2.5 sm:p-3 mb-4 sm:mb-5 rounded-xl border focus:ring-2 focus:ring-black outline-none text-sm sm:text-base"
              required
            />

            {/* PHONE */}
            <div className="mb-5 sm:mb-6">
              <input
                type="tel"
                placeholder="Phone Number"
                value={shippingAddress.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    setShippingAddress({
                      ...shippingAddress,
                      phone: value,
                    });

                    if (value.length < 10) {
                      setPhoneError("Phone number must be 10 digits");
                    } else {
                      setPhoneError("");
                    }
                  } else {
                    setPhoneError("Only 10 digits allowed");
                  }
                }}
                className={`w-full p-2.5 sm:p-3 rounded-xl border outline-none transition text-sm sm:text-base ${
                  phoneError
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-black"
                }`}
                required
              />

              {phoneError && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {phoneError}
                </p>
              )}
            </div>

            {/* BUTTON */}
            {!checkoutId ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="w-full py-3.5 sm:py-4 rounded-xl bg-black text-white font-semibold shadow-md sm:shadow-lg hover:shadow-xl transition text-sm sm:text-base"
              >
                Continue to Payment →
              </motion.button>
            ) : (
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Pay with Paypal
                </h3>

                <PaypalButton
                  amount={cart.totalPrice}
                  onSuccess={handelPaymentSuccess}
                  onError={() => {
                    toast.error("❌ Payment Failed! Please try again.");
                  }}
                />
              </div>
            )}
          </form>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg sm:shadow-xl border border-gray-100"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Order Summary
          </h3>

          <div className="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
            {cart.products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-16 sm:w-16 sm:h-20 rounded-lg object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {product.size} • {product.color}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-sm sm:text-base">
                  ₹{product.price}
                </p>
              </motion.div>
            ))}
          </div>

          {/* PRICE DETAILS */}
          <div className="mt-5 sm:mt-6 space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cart.totalPrice?.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-3 sm:pt-4 flex justify-between text-base sm:text-lg font-bold">
              <span>Total</span>
              <span>₹{cart.totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
