"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif p-8 space-y-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">About Leaf Disease Detector</h1>
      <p className="text-lg text-gray-700">
        Leaf Disease Detector is an AI-powered tool developed by Team 8 (Sathwika, Anjali, Nanditha) to help farmers and gardeners quickly diagnose plant leaf diseases.
      </p>
      <p className="text-lg text-gray-700">
        This application leverages a FastAPI backend with a machine learning model trained on thousands of plant leaf images, delivering fast and accurate disease predictions.
      </p>
      <p className="text-lg text-gray-700">
        Our mission is to empower growers with accessible, accurate, and actionable plant health insights, fostering healthier crops and sustainable practices.
      </p>
      <p className="text-lg text-gray-700">
        Explore our Disease Library for detailed information, use the Detector for instant analysis, and share your feedback via the Feedback page to help us improve.
      </p>

      {/* Key Features */}
      <section>
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Instant disease prediction from uploaded leaf images</li>
          <li>Comprehensive Disease Library with symptoms and treatment tips</li>
          <li>Responsive and intuitive user interface across all devices</li>
          <li>Feedback system to report wrong predictions and suggest improvements</li>
        </ul>
      </section>

      {/* Technology Stack */}
      <section>
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Technology Stack</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Next.js 15 & React 18 for the frontend</li>
          <li>Tailwind CSS for styling and layout</li>
          <li>FastAPI in Python for the prediction API</li>
          <li>Custom machine learning model trained on plant leaf datasets</li>
        </ul>
      </section>

      {/* Future Roadmap */}
      <section>
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Future Roadmap</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>User authentication and diagnosis history</li>
          <li>Advanced search and filtering in the Disease Library</li>
          <li>Community image contributions to improve the model</li>
          <li>Dark/light mode support and theming options</li>
        </ul>
      </section>

      {/* Contact & Resources */}
      <section>
        <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Contact & Resources</h2>
        <p className="text-gray-700">
          GitHub: <a href="https://github.com/sathwika-reddy-gundra/leafdiseasedetector" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Repository</a>
        </p>
      </section>
    </div>
  );
}
