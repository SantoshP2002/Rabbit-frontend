const hoverBorders = [
  "hover:border-red-400 hover:shadow-red-400",
  "hover:border-blue-400 hover:shadow-blue-400",
  "hover:border-purple-400 hover:shadow-purple-400",
];

const items = [
  {
    title: "Premium Quality",
    desc: "We use top-grade materials for long-lasting comfort.",
  },
  {
    title: "Modern Design",
    desc: "Trend-driven styles inspired by global fashion.",
  },
  {
    title: "Customer First",
    desc: "Your satisfaction and trust are our top priority.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* HERO SECTION */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="text-center group">
            <h1 className="text-5xl md:text-6xl font-bold tracking-[6px] uppercase cursor-pointer">
              About Us
              <div className="w-64 h-[2px] bg-black mx-auto mt-5 transition-all duration-300 group-hover:w-96"></div>
            </h1>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            We are more than just a clothing brand — we create identity,
            confidence, and lifestyle through fashion.
          </p>
        </div>

        {/* BRAND STORY */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-wide">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Started with a vision to redefine everyday fashion, our journey
              began with a simple idea — clothing should not just be worn, it
              should be felt. From small beginnings to a growing fashion
              community, we focus on quality, comfort, and modern style that
              speaks for itself.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Every piece is designed with attention to detail, ensuring you not
              only look good but feel confident in every moment of your life.
            </p>
          </div>

          {/* IMAGE CARD */}
          <div className="relative group">
            <div className="absolute rounded-2xl transition "></div>
            <div className="relative rounded-2xl p-8 shadow-lg hover:shadow-sky-300 border border-l-4 border-t-4 hover:border-sky-200">
              <h3 className="text-2xl font-bold tracking-widest uppercase">
                Fashion Redefined
              </h3>
              <p className="text-gray-500 mt-4 text-sm">
                Minimal design. Maximum impact. Built for modern lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-2xl shadow border transition duration-300 hover:shadow-2xl border-l-2 border-t-2 ${hoverBorders[index % hoverBorders.length]}`}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FOOTER TAGLINE */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-widest">SANTOSH PAWAR</h2>
          <p className="text-gray-500 text-sm">
            Built with passion. Designed for style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
