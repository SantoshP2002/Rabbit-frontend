import { useState } from "react";

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day easy return policy on all unused and unwashed items with original packaging.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 3-7 business days depending on your location.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, we provide Cash on Delivery (COD) across most locations in India.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking link via email or SMS.",
  },
];
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="text-center group">
            <h1 className="text-5xl md:text-6xl font-bold tracking-[6px] uppercase cursor-pointer">
              FAQ
              <div className="w-28 h-[2px] bg-black mx-auto mt-5 transition-all duration-300 group-hover:w-44"></div>
            </h1>
          </div>
          <p className="text-gray-500 text-sm">Frequently Asked Questions</p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex justify-between items-center cursor-pointer"
              >
                <span className="font-semibold text-gray-800">
                  {item.question}
                </span>
                <span className="text-xl transition-transform duration-300">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`px-5 pb-5 text-gray-500 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
