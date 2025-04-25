"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is the Leaf Disease Detector?",
    answer:
      "The Leaf Disease Detector is a web application that uses artificial intelligence to analyze images of plant leaves and predict possible diseases. Simply upload a photo of a leaf, and the app will provide a diagnosis along with confidence and helpful tips."
  },
  {
    question: "How accurate are the predictions?",
    answer:
      "The accuracy depends on the quality of the uploaded image and the diversity of the training data used for the AI model. While the tool provides high-confidence results for common diseases, it may not recognize rare or visually similar diseases. Always consult an expert for critical decisions."
  },
  {
    question: "What types of plants are supported?",
    answer:
      "Currently, the app is optimized for common bean plant diseases, but future updates may include support for more plant species. Check the Disease Library for the latest list of supported diseases."
  },
  {
    question: "How do I take a good photo for diagnosis?",
    answer:
      "Ensure the leaf is in focus, well-lit, and occupies most of the frame. Avoid blurry, shadowed, or distant photos. Remove any background clutter for best results."
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Uploaded images are only used for disease prediction and are not stored or shared. Your privacy is important to us."
  },
  {
    question: "Can I use the app on my phone?",
    answer:
      "Absolutely! The Leaf Disease Detector is fully responsive and works on smartphones, tablets, and desktop computers."
  },
  {
    question: "What should I do if the diagnosis seems wrong?",
    answer:
      "If you suspect the diagnosis is incorrect, try uploading a clearer image or consult the Disease Library for more information. For critical issues, always seek advice from a qualified agronomist or plant pathologist."
  },
  {
    question: "Can I contribute more images or feedback?",
    answer:
      "Yes! We welcome user feedback and additional images to improve the model. Use the Feedback page or contact us directly to contribute."
  },
  {
    question: "How can I prevent plant diseases?",
    answer:
      "Practice crop rotation, use disease-free seeds, maintain good field hygiene, and monitor your plants regularly. Consult the Disease Library for disease-specific prevention tips."
  },
  {
    question: "Who developed this project?",
    answer:
      "This project was developed by Team 8 (sathwika, anjali, nanditha) as part of an educational and research initiative."
  },
  {
    question: "Will more features be added in the future?",
    answer:
      "Yes! We plan to expand the app with more plant species, improved AI, user accounts, and more educational resources. Stay tuned for updates."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Frequently Asked Questions</h1>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx} className="mb-4 border-b border-green-200 pb-4">
            <button
              className="w-full text-left text-lg font-semibold text-green-700 focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              <span>{faq.question}</span>
              <span className="ml-2">{openIndex === idx ? "-" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div
                id={`faq-answer-${idx}`}
                className="mt-2 text-gray-700 text-base animate-fade-in"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
