// src/ImageSlider.js
import React, { useState, useEffect } from 'react';
import './imageSlider.css';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ImageSlider = ({ images, parallaxIntensity, transitionSpeed, autoSlideInterval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  function getInitialDarkMode() {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  }

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const parallaxOffset = window.scrollY * parallaxIntensity;
      document.documentElement.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
    }, 10);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [parallaxIntensity]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [autoSlideInterval]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const transformValue = -currentIndex * 100;

  return (
    <div className={`image-slider-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="parallax-text">
        <h1 style={{ color: darkMode ? '#2ea6cb' : '#f44336' }}>This text has Parallax effects</h1>
      </div>

      <div className="image-slider" style={{ transform: `translateX(${transformValue}%)`, transition: `transform ${transitionSpeed}s ease-in-out` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider-item ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <button className="slider-button prev" onClick={handlePrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button className="slider-button next" onClick={handleNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
    </div>
  );
};

export default ImageSlider;
