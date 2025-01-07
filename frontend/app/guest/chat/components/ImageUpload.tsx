import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      // Handle the file upload (e.g., send to API or store locally)
      console.log("Uploading file:", selectedImage);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          Choose Image
        </Button>
      </label>
      {selectedImage && (
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Button
            onClick={handleUpload}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
          >
            Upload Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
