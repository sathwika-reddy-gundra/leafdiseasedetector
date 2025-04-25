"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setShowResult(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setShowResult(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);
    setShowResult(false);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to get result from backend");
      const data = await response.json();
      setResult(data);
      setShowResult(true);
    } catch (err: any) {
      setError("Failed to analyze image. Please try again.");
      setShowResult(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setShowResult(false);
    setResult(null);
    setError(null);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-serif">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 shadow-lg border-b border-green-300 flex items-center justify-between px-6 py-4 relative">
        <div className="text-2xl font-bold tracking-tight font-serif text-green-800">
          Leaf Disease Detector
        </div>
        <nav className="hidden md:flex gap-8 text-base font-medium">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <Link href="/diseases" className="hover:text-green-700 transition">Disease Library</Link>
          <Link href="/about" className="hover:text-green-700 transition">About</Link>
          <Link href="/faq" className="hover:text-green-700 transition">FAQ</Link>
          <Link href="/feedback" className="hover:text-green-700 transition">Feedback</Link>
        </nav>
        <button
          className="md:hidden text-2xl text-green-800 focus:outline-none"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4">
          <Link href="/" className="text-lg font-medium text-green-800 hover:text-green-700 transition">Home</Link>
          <Link href="/diseases" className="text-lg font-medium text-green-800 hover:text-green-700 transition">Disease Library</Link>
          <Link href="/about" className="text-lg font-medium text-green-800 hover:text-green-700 transition">About</Link>
          <Link href="/faq" className="text-lg font-medium text-green-800 hover:text-green-700 transition">FAQ</Link>
          <Link href="/feedback" className="text-lg font-medium text-green-800 hover:text-green-700 transition">Feedback</Link>
        </div>
      )}

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {/* Welcome Panel */}
        <section className="w-full max-w-2xl mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-green-900 mb-2">Leaf Disease Detector</h1>
          <p className="text-lg sm:text-xl font-light text-gray-600 mb-6">
            Upload a leaf image to diagnose plant diseases instantly.
          </p>
        </section>

        {/* Image Upload Area */}
        <section className="w-full max-w-md flex flex-col items-center">
          {!showResult && (
            <div
              className="w-full border-2 border-dashed border-green-700 bg-white rounded-2xl flex flex-col items-center justify-center p-6 shadow-md mb-6 transition"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label className="block cursor-pointer mb-4">
                <span className="inline-block px-5 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition shadow-sm">
                  Choose Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  aria-label="Choose image file"
                />
              </label>
              <p className="text-gray-600 text-sm mb-2">or drag & drop here</p>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 h-48 object-contain rounded-lg border border-gray-300 shadow mb-4"
                />
              )}
              {selectedImage && (
                <button
                  onClick={handleUpload}
                  className="mt-2 px-6 py-2 bg-green-800 text-white rounded-lg font-semibold hover:bg-green-900 transition shadow"
                >
                  Upload
                </button>
              )}
            </div>
          )}

          {/* Result Card */}
          {loading && <div className="mb-4 text-green-800 font-medium">Analyzing image...</div>}
          {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
          {showResult && result && (
            <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center animate-fade-in">
              <img
                src={preview || ""}
                alt="Leaf Preview"
                className="w-32 h-32 object-contain rounded-lg border border-gray-300 shadow mb-4"
              />
              <h2 className="text-2xl font-bold text-green-900 mb-2 text-center">
                {result.disease}
              </h2>
              <div className="w-full flex flex-col items-center mb-2">
                <span className="text-gray-600 text-sm mb-1">Confidence</span>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-green-700 h-4 rounded-full transition-all"
                    style={{ width: result.confidence ? result.confidence : "0%" }}
                  ></div>
                </div>
                <span className="text-green-900 text-sm mt-1 font-medium">
                  {result.confidence}
                </span>
              </div>
              <p className="text-md text-gray-700 mb-2 text-center">
                {result.description || ""}
              </p>
              {result.tips && (
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4 text-left">
                  {result.tips.map((tip: string, idx: number) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={handleReset}
                className="mt-2 px-6 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-900 transition shadow"
              >
                Try another image
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-sm text-gray-700 bg-gray-100 border-t border-gray-200 mt-auto">
        <nav className="mb-1 flex flex-wrap justify-center gap-4">
          <a href="#docs" className="hover:underline">Documentation</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="https://github.com/sathwika-reddy-gundra/leafdiseasedetector/" className="hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
        <span className="block text-xs">Project made by Team 8, sathwika, anjali, nanditha</span>
      </footer>
    </div>
  );
}
