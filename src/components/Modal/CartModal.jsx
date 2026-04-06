import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import CartContents from "../Cart/CartContents";
import Modal from "../modal";

const CartModal = ({
  drawerOpen,
  closeCartModal,
  cart,
  user,
  guestId,
  openCheckout,
}) => {
  const navigate = useNavigate();

  const hasItems = cart && cart?.products?.length > 0;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <Modal
          isOpen={drawerOpen}
          onClose={closeCartModal}
          heading="Your Cart"
          className="w-full max-w-5xl h-[90vh] !rounded-3xl shadow-2xl bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col h-full"
          >
            {/* Scrollable Content */}
            <div
              className="flex-grow overflow-y-auto p-6 space-y-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {hasItems ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartContents
                    cart={cart}
                    userId={user?._id}
                    guestId={guestId}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-5xl"
                  >
                    🛍️
                  </motion.div>

                  <p className="text-2xl font-semibold text-gray-700 mt-4 mb-2">
                    Your Cart is Empty
                  </p>
                  <p className="text-gray-500 mb-4">
                    Start adding products and make it yours ✨
                  </p>
                  <button
                    onClick={closeCartModal}
                    className="px-6 py-2 bg-black text-white rounded-full hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </div>

            {/* Bottom Checkout Section */}
            {hasItems && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
                className="p-4 border-t bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-medium text-gray-700">
                    Total
                  </span>
                  <motion.span
                    key={cart?.totalPrice}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-xl font-bold text-black"
                  >
                    ₹{cart?.totalPrice || 0}
                  </motion.span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    closeCartModal();
                    if (!user) {
                      navigate("/login?redirect=checkout");
                    } else {
                      openCheckout();
                    }
                  }}
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide shadow-md"
                >
                  Proceed to Checkout →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
