import { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      question: "What are the accepted payment methods?",
      answer:
        " We only accept payments through Stripe, ensuring secure transactions with major credit and debit cards.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We exclusively accept payments via Stripe, ensuring secure transactions with major credit and debit cards like Visa, Mastercard, American Express, and Discover.",
    },
    {
      question: "Do you offer discounts and promotions?",
      answer:
        "Yes, we frequently provide discounts, promotions, and special deals. Stay updated on the latest offers by subscribing to our newsletter or following us on social media.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border rounded p-4">
            {/* Question */}
            <button
              className="flex justify-between w-full text-left font-semibold"
              onClick={() =>
                setOpenQuestion(openQuestion === index ? null : index)
              }
            >
              <span>{faq.question}</span>

              <FaAngleDoubleDown
                className={`h-6 w-6 transition-transform text-red-500 ${
                  openQuestion === index ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {openQuestion === index && (
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
