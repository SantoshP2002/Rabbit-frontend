import { Link } from "react-router-dom";
import GenderWiseProduct from "./GenderWiseProduct";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* WOMENS COLLECTION */}
        <div className="relative flex-1 mx-10">
          <img
            src="https://img.freepik.com/free-photo/studio-close-up-portrait-young-fresh-blonde-woman-brown-straw-poncho-wool-black-trendy-hat-round-glasses-looking-camera-green-leather-had-bag_273443-1121.jpg?semt=ais_incoming&w=740&q=80"
            alt="Womens Collection image"
            className="w-[1200px] h-[550px] object-cover"
          />
          {/* CHILD COLLECTION */}
          <div className="absolute bottom-0 right-0 p-6">
            <div className=" bg-white bg-opacity-90 p-4">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 ">
                WoMen's Collection
              </h2>
              <Link
                to="/gender-products?gender=Women"
                className="text-gray-900 underline text-base md:text-lg"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>

        {/* MEN'S COLLECTION */}

        <div className="relative flex-1  mx-10">
          <img
            src="https://www.shutterstock.com/image-photo/carefree-african-american-man-stylish-600nw-2413981643.jpg"
            alt="Mens Collection image"
            className="w-[1200px] h-[550px] object-cover"
          />

          {/* CHILD COLLECTION */}

          <div className="absolute bottom-0 right-0 p-6">
            <div className=" bg-white bg-opacity-90 p-4">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 ">
                Men's Collection
              </h2>
              <Link
                to="/gender-products?gender=Men"
                className="text-gray-900 underline text-base md:text-lg"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
