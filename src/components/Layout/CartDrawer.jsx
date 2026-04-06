import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handelCheckout = () => {
    toggleCartDrawer();

    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-y-0" : "translate-x-full"
      }`}
    >
      {/* CLOSE BUTTON */}
      <div className="flex justify-end p-4 ">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Cart Content With Scrollable Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-xl text-gray-600 animate-bounce animate-fade-in">
            Your Cart is Empty
          </p>
        )}
      </div>

      {/* CHECKOUT BUTTON FIXED AT THE BOTTOM */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handelCheckout}
              className="relative overflow-hidden group w-full bg-white text-black py-1 rounded-lg font-semibold transition-all duration-500 border border-black"
            >
              <span className="relative z-10 text-sm transition-all duration-500 group-hover:text-white">
                CHECK-OUT
              </span>
              <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100 z-0"></span>
            </button>
            <p className="text-xs tracking-tighter text-gray-500 mt-2 text-center">
              Shipping, taxes, and discount code calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
