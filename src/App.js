import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import axios from 'axios'; // Make sure to install axios
import './App.css'; // Assuming you have some CSS for basic styling

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const removeBackground = async (imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': '92kABoRuuQHqMr8p2YRRu8M4'
        },
        responseType: 'blob'
      });

      setImageSrc(URL.createObjectURL(response.data));
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Failed to remove background. Check console for errors.');
    }
  };

  const handleImageUpload = (imageFile) => {
    removeBackground(imageFile);
  };

  return (
    <div className="App">
      <h1>Image Background Remover</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      {imageSrc && (
        <div>
          <h2>Result:</h2>
          <img src={imageSrc} alt="Result" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default App;
