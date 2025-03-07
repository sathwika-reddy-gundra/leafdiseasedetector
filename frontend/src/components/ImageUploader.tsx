"use client";

import { useState } from "react";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ disease: string; confidence: string } | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setUploading(true); // Disable button while uploading
    setResult(null); // Clear previous result

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const resultData = await response.json();
      console.log("Upload Success:", resultData);

      setResult({
        disease: resultData.disease,
        confidence: resultData.confidence,
      });

      if (resultData.predicted_label === null) {
        alert("⚠️ The model is uncertain. Please upload a clearer leaf image.");
      }

      setSelectedImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false); // Re-enable button
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-xl w-96 bg-gray-900 shadow-lg">
      <label className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-3">
        Choose an Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 h-auto rounded-lg border border-gray-600 shadow-lg mb-3"
        />
      )}

      {selectedImage && (
        <p className="text-sm text-gray-400 mb-2">Selected File: {selectedImage.name}</p>
      )}

      {uploading && (
        <div className="flex justify-center items-center mt-3">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-400">Uploading...</span>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 border rounded-lg bg-gray-800 text-white w-full text-center shadow-md">
          <p className="text-lg font-semibold">🩺 Diagnosis:</p>
          <p className="text-xl text-green-400 font-bold">{result.disease}</p>
          <p className="text-sm text-gray-300 mt-1">Confidence: {result.confidence}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        className={`mt-3 px-5 py-2 text-white rounded-lg transition font-semibold ${
          uploading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUploader;