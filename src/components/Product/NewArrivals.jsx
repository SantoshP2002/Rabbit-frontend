import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`,
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  // Mouse drag functionality
  // handelMouseDown
  const handelMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // handelMouseMove
  const handelMouseMove = (e) => {
    if (!isDragging) return; // If not dragging, do nothing
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // handelMouseUpOrLeave
  const handelMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update scroll buttons

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);
  return (
    <>
      <section className="py-16 px-4 lg:px-6">
        <div className="container mx-auto text-center mb-10 relative">
          <h2 className="text-3xl font-bold mb-1 text-gray-600 tracking-wide">
            Explore <span className="text-rose-400">NEW ARRIVALS</span>
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Discover the latest trends and styles in our new arrivals
            collection.
          </p>

          <div
            className="w-[80%] mx-auto h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    [clip-path:polygon(0%_50%,10%_0%,90%_0%,100%_50%,90%_100%,10%_100%)]"
          ></div>

          {/* SCROLL BUTTON */}
          <div className="absolute right-0 bottom-[-30px] flex space-x-2 mx-8 gap-4 ">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded border ${
                canScrollLeft
                  ? "bg-white text-black"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FiChevronLeft className="" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`p-2 rounded border ${
                canScrollRight
                  ? "bg-white text-black"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FiChevronRight className="" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT  */}

        <div
          ref={scrollRef}
          className={`border container overflow-x-scroll scrollbar-hidden flex space-x-6 relative m-auto ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handelMouseDown}
          onMouseMove={handelMouseMove}
          onMouseUp={handelMouseUpOrLeave}
          onMouseLeave={handelMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
            >
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-[300px] object-cover rounded-lg "
                draggable="false"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-lg ">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium ">{product.name}</h4>
                  <p className="mt-1">₹{product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewArrivals;

// const newArrivals = [
//   {
//     _id: "1",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/1/b1d3b76KHULL-KSLTOPS1637_3.jpg?rnd=20200526195200&tr=w-512",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "2",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://img.faballey.com/images/Product/ITP01141Z/d3.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "3",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://img.faballey.com/images/Product/ITP00539Z/d3.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "4",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://sheetalonlinefashion.in/cdn/shop/files/ftqn5_512.webp?v=1711571074",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "5",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://5.imimg.com/data5/SELLER/Default/2024/5/417900582/TU/ZK/BL/195131304/girls-crop-top.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "6",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/6/96efb9bNF_MIXTB00004420_1.jpg?rnd=20200526195200&tr=w-512",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "7",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://assets.ajio.com/medias/sys_master/root/20230801/Rv4s/64c935e7a9b42d15c9843bbd/-473Wx593H-466411703-orange-MODEL.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "8",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://i.pinimg.com/474x/57/f8/17/57f8178871f0e027b568098043f784c9.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "9",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://media-us.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000012041648-Beige-ECRU-1000012041648_01-2100.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "10",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/f/ef38c03VASGT004PNnGS001-Multi-Color_1.jpg?rnd=20200526195200&tr=w-512",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "11",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://img.faballey.com/images/Product/IBL00003Z/d3.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "12",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://img.faballey.com/images/Product/ITP01212Z/d3.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "13",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIE68WpLHdF-llxZR-YTFLmsxSf4vJAc9SXw&s",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "14",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://assets.ajio.com/medias/sys_master/root/20231029/c1iv/653e5f06ddf77915196087fd/-473Wx593H-466754261-orange-MODEL.jpg",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "15",
//     name: "Stylish Jacket",
//     price: 126,
//     images: [
//       {
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6fHNqFgJ1kxQSEPx2Itn4282DJebH42iCQ&s",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
// ];
