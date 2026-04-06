const features = [
  {
    title: "Premium Quality",
    desc: "Crafted with high-quality fabrics for long-lasting comfort and durability.",
  },
  {
    title: "Modern Designs",
    desc: "Trendy styles inspired by global fashion and streetwear culture.",
  },
  {
    title: "Affordable Pricing",
    desc: "Luxury feel without breaking your budget. Fashion made accessible.",
  },
  {
    title: "Fast Delivery",
    desc: "Quick and reliable shipping across multiple locations in India.",
  },
  {
    title: "Easy Returns",
    desc: "Hassle-free return policy to ensure a smooth shopping experience.",
  },
  {
    title: "Customer Support",
    desc: "Dedicated support team available to help you anytime.",
  },
];

const hoverBorders = [
  "hover:border-red-400 hover:shadow-red-400",
  "hover:border-blue-400 hover:shadow-blue-400",
  "hover:border-green-400 hover:shadow-green-400",
  "hover:border-yellow-400 hover:shadow-yellow-400",
  "hover:border-purple-400 hover:shadow-purple-400",
  "hover:border-pink-400 hover:shadow-pink-400",
];

const Feature = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="text-center group">
            <h1 className="text-5xl md:text-6xl font-bold tracking-[6px] uppercase cursor-pointer">
              Feature
              <div className="w-64 h-[2px] bg-black mx-auto mt-5 transition-all duration-300 group-hover:w-80"></div>
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            Why choose us for your fashion needs
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border border-gray-200 shadow-md transition-all duration-300 group hover:shadow-2xl border-l-2 border-t-2 ${hoverBorders[index % hoverBorders.length]}`}
            >
              <div className="w-10 h-10 mb-4 rounded-full bg-black group-hover:scale-110 transition"></div>

              <h3 className="text-xl font-semibold mb-2 group-hover:tracking-wide transition-all">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto py-16 px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold tracking-[4px] uppercase">
              What We Offer
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Everything you get when you shop with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ITEM 1 */}
            <div className="p-6 border rounded-xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                👕 Premium Clothing
              </h3>
              <p className="text-gray-600 text-sm">
                High-quality fabrics designed for comfort, durability, and
                long-lasting wear.
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="p-6 border rounded-xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick shipping across India with reliable tracking and safe
                packaging.
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="p-6 border rounded-xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                💸 Affordable Pricing
              </h3>
              <p className="text-gray-600 text-sm">
                Premium fashion at budget-friendly prices without compromising
                quality.
              </p>
            </div>

            {/* ITEM 4 */}
            <div className="p-6 border rounded-xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">🔁 Easy Returns</h3>
              <p className="text-gray-600 text-sm">
                Hassle-free return policy for a smooth and worry-free shopping
                experience.
              </p>
            </div>

            {/* ITEM 5 */}
            <div className="p-6 border rounded-xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">🛍️ Trendy Designs</h3>
              <p className="text-gray-600 text-sm">
                Latest fashion inspired by global streetwear and modern trends.
              </p>
            </div>

            {/* ITEM 6 */}
            <div className="p-6 border rounded-xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                📞 Customer Support
              </h3>
              <p className="text-gray-600 text-sm">
                Dedicated support team available to help you anytime you need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
