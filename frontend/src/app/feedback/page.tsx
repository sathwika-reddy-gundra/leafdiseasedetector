"use client";

import React, { useState } from "react";

export default function FeedbackPage() {
  const [type, setType] = useState("problem");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the feedback to your backend or an email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Feedback & Problem Report</h1>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
        {submitted ? (
          <div className="text-green-700 text-lg font-semibold text-center">
            Thank you for your feedback! We appreciate your help in improving the Leaf Disease Detector.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium mb-2">Type of Feedback</label>
              <select
                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                value={type}
                onChange={e => setType(e.target.value)}
                required
              >
                <option value="problem">Report a Problem / Wrong Disease Prediction</option>
                <option value="suggestion">Suggest a Feature</option>
                <option value="general">General Feedback</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-medium mb-2">Your Feedback</label>
              <textarea
                className="w-full border border-green-300 rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-200"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe the issue, suggest an improvement, or share your experience..."
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-2">Email (optional)</label>
              <input
                type="email"
                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition shadow"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
