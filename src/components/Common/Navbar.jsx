import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { AiOutlineAlignRight } from "react-icons/ai";

import SearchBar from "./SearchBar";
import CartModal from "../Modal/CartModal";
import CheckoutModal from "../Modal/CheckoutModal";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const openCartModal = () => setDrawerOpen(true);
  const closeCartModal = () => setDrawerOpen(false);
  return (
    <>
      <CartModal
        drawerOpen={drawerOpen}
        closeCartModal={closeCartModal}
        cart={cart}
        user={user}
        guestId={guestId}
        openCheckout={() => setCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      <nav className="container mx-auto flex items-center justify-around py-4 px-6">
        {/* Left Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>

        {/* Center Navigation Link */}
        <div className="hidden md:flex space-x-8">
          {/* MEN */}
          <Link
            to="/collections/all?gender=Men"
            className="relative group text-gray-600 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105"
          >
            <span className="text-black group-hover:opacity-100 opacity-80 transition duration-300">
              Men
            </span>

            {/* Underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-gray-500 via-gray-500 to-gray-500 transition-all duration-500 group-hover:w-full"></span>
          </Link>

          {/* WOMEN */}
          <Link
            to="/collections/all?gender=Women"
            className="relative group text-gray-600 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105"
          >
            <span className="text-black group-hover:opacity-100 opacity-80 transition duration-300">
              Women
            </span>

            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 transition-all duration-500 group-hover:w-full"></span>
          </Link>

          {/* TOP WEAR */}
          <Link
            to="/collections/all?category=Top Wear"
            className="relative group text-gray-600 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105"
          >
            <span className="text-black group-hover:opacity-100 opacity-80 transition duration-300">
              Top Wears
            </span>

            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-gray-400 to-gray-500 transition-all duration-500 group-hover:w-full"></span>
          </Link>

          {/* BOTTOM WEAR */}
          <Link
            to="/collections/all?category=Bottom Wear"
            className="relative group text-gray-600 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105"
          >
            <span className="text-black group-hover:opacity-100 opacity-80 transition duration-300">
              Bottom Wear
            </span>

            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-gray-400 to-indigo-200 transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>

        {/* RIGHT SIDE ICON */}

        <div className="flex items-center space-x-6">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-blue-500 px-2 rounded text-sm text-white"
            >
              ADMIN
            </Link>
          )}
          {/* USER PROFILE ICON  */}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          {/* ADD To CART ICON  */}
          <button onClick={openCartModal} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />

            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* SEARCH  */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden">
            <AiOutlineAlignRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} /> */}

      {/* MOBILE NAVIGATION */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2  md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 ">MENU</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              MEN
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              TOP WEAR
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              BOTTOM WEAR
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
