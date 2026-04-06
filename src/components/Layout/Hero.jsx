import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative  overflow-hidden">
      <img
        src="https://raw.githubusercontent.com/kushald/rabbit-assets/refs/heads/main/assets/rabbit-hero.webp"
        alt="Hero Banner"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6 ">
          <h1
            className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4 
                  "
          >
            {" "}
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6 ">
            Explore Our Vacation-Ready outFits With Fast WorldWide Shipping.
          </p>

          <Link
            to="#"
            className="relative inline-block px-6 py-2 text-lg text-gray-950 bg-white rounded-sm overflow-hidden group transition-all duration-500"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:text-white">
              SHOP NOW
            </span>
            <span className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
