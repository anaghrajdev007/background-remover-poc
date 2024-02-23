import React, { useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';
import axios from 'axios';
import './App.css';

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (event) => {
      event.preventDefault();
    };

    // Attempt to disable common keyboard shortcuts for opening developer tools
    const disableDevToolsShortcut = (event) => {
      // Disable for F12, Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+Shift+C
      if ((event.keyCode === 123) || // F12
          (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67))) { // Ctrl+Shift+I/J/C
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableDevToolsShortcut);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableDevToolsShortcut);
    };
  }, []);

  const removeBackground = async (imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': '92kABoRuuQHqMr8p2YRRu8M4' // Use your actual API key
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
