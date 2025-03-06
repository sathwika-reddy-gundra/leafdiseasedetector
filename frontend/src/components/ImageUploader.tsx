"use client";

import { useState } from "react";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }
    console.log("Uploading image:", selectedImage);
    // TODO: Implement API call to backend
  };

  return (
    <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-xl w-96">
      <label className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 mb-2">
        Choose File
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
      {selectedImage && (
        <p className="text-sm text-gray-300 mb-2">{selectedImage.name}</p>
      )}
      {preview && <img src={preview} alt="Preview" className="w-full h-auto rounded-lg mb-2" />}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
