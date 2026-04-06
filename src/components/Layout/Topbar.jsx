import React from "react";
import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdPhone } from "react-icons/md";

const Topbar = () => {
  return (
    <div className="bg-gray-800 text-white text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 overflow-hidden">
        {/* LEFT - Social Icons */}
        <div className="flex items-center gap-4">
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          <FaWhatsapp className="hover:text-green-400 cursor-pointer" />
        </div>

        {/* CENTER - Auto-Scrolling Marquee Text */}
        <div className="relative w-[40%] h-5 overflow-hidden">
          <div className="absolute whitespace-nowrap animate-marquee text-center">
            Fast Delivery • Fashion Cloths Everyday • 100% Fabrics Cotton •
            Bulk Orders Available • Custom Bouquets •
          </div>
        </div>

        {/* RIGHT - Phone Number */}
        <div className="flex items-center gap-1">
          <MdPhone className="text-green-400" />
          <span>+91 98765 43210</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
