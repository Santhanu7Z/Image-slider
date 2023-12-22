// src/App.js
import React from 'react';
import ImageSlider from './imageSlider';

function App() {
  const images = [
    './deathnote.jpg',
    './gta5.jpg',
    './gta.jpg',
  ];

  return (
    <div className="App">
      <ImageSlider images={images} parallaxIntensity={0.3} transitionSpeed={0.5} autoSlideInterval={10000}/>
      <div style={{ height: '100vh', backgroundColor: '#f0f0f0', color:'#2ea6cb'}}>
        <h1>Scroll down to see the parallax effect in action!</h1>
        <p>Thank you for Visiting the Website</p>
      </div>
    </div>
  );
}

export default App;
