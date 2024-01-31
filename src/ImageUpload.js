import React from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      onImageUpload(img); // Pass the image up to the parent component
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUpload;
