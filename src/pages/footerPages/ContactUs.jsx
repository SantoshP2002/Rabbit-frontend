import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="max-w-7xl p-4 mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Let’s Talk About Your Style
          </h2>
          <p className="text-gray-600 text-lg">
            Whether it’s about your order, our latest collection, or styling
            advice — we’re here for you.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">support@fashionstore.com</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <p className="font-semibold">Location</p>
              <p className="text-gray-600">Nanded, Maharashtra</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black"
              />
              <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-valid:-top-4 peer-valid:text-xs">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black"
              />
              <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-valid:-top-4 peer-valid:text-xs">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black"
              />
              <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-valid:-top-4 peer-valid:text-xs">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl hover:scale-105 active:scale-95 transition transform duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* DOWN SECTION */}

      {/* BRAND HEADER */}
      <div className="mt-10 text-center group cursor-default">
        <h1 className="text-5xl font-bold tracking-[6px] uppercase transition-all duration-300 group-hover:tracking-[10px]">
          SANTOSH
        </h1>

        <h2 className="text-lg text-gray-500 tracking-[8px] uppercase mt-1">
          PAWAR
        </h2>

        <div className="w-20 h-[2px] bg-black mx-auto my-4 transition-all duration-300 group-hover:w-32"></div>

        <p className="text-sm text-gray-400 tracking-[6px]">CONTACT US</p>
      </div>
    </div>
  );
}
