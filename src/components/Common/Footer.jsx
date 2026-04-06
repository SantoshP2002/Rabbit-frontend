import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import ContactUs from "../../pages/footerPages/ContactUs";
import { useSelector } from "react-redux";

const Footer = () => {
  const { shop } = useSelector((state) => state.adminShop);
  return (
    <footer className="border-t  py-8 px-6 lg:px-8 text-sm text-gray-700 bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4 lg:px-0">
        {/* NewsLetter */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-2xl font-semibold uppercase text-gray-800">
            Newsletter
          </h3>
          <p className="text-gray-600 text-xs sm:text-lg leading-relaxed">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm sm:text-lg text-gray-700">
            Sign up and get{" "}
            <span className="text-red-500 font-semibold">10% OFF</span> your
            first order.
          </p>

          <form className="flex justify-start">
            <input
              type="email"
              placeholder="Enter Your Email..."
              className="p-3 w-min  text-xs border border-gray-300 rounded-l-md focus:outline-none outline-none transition-all"
              required
            />
            <button
              type="submit"
              className="min-w-24 relative overflow-hidden group text-black px-3 py-3 text-xs font-semibold rounded-r-md bg-red-500 transition-all duration-500"
            >
              <span className="relative z-10 group-hover:text-white">
                SUBSCRIBE
              </span>
              <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out z-0"></span>
            </button>
          </form>
        </div>

        {/* SHOP */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-2xl font-semibold uppercase text-gray-800">
            Shop
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="collections/all?category=Top+Wear&gender=Men"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="collections/all?category=Top+Wear&gender=Women"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="collections/all?category=Bottom+Wear&gender=Men"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="collections/all?category=Bottom+Wear&gender=Women"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-2xl font-semibold uppercase text-gray-800">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="contact-us"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="about-us"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="faq"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="feature"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="shop"
                className="text-sm sm:text-lg hover:text-blue-600 transition-colors"
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold uppercase text-gray-800">
            Follow Us
          </h3>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-900">
              <TbBrandMeta className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-gray-900">
              <IoLogoInstagram className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-gray-900">
              <RiTwitterXLine className="w-8 h-8" />
            </a>
          </div>
          <p className="text-gray-600 text-lg sm:text-xl">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" stroke="green" />
            <a href={`tel:${shop?.phone}`}>
              {shop?.phone || "No phone available"}
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-10 px-4 lg:px-0 border-t border-gray-200 pt-6 text-center">
        <p className="text-gray-500 text-xs tracking-tight sm:text-lg">
          &copy; {new Date().getFullYear()} {shop?.name || "My Shop"} | All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
