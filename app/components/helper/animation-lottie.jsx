"use client"

import { useEffect, useState } from 'react';
import Lottie from "lottie-react";

const AnimationLottie = ({ animationPath, width = '95%' }) => {
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        // If animationPath is already an object (imported JSON), use it directly
        if (typeof animationPath === 'object' && animationPath !== null) {
          setAnimationData(animationPath);
          setLoading(false);
          return;
        }

        // If it's a string path, fetch the JSON file
        if (typeof animationPath === 'string') {
          const response = await fetch(animationPath);
          const data = await response.json();
          setAnimationData(data);
        }
      } catch (error) {
        console.error('Error loading animation:', error);
      } finally {
        setLoading(false);
      }
    };

    if (animationPath) {
      loadAnimation();
    }
  }, [animationPath]);

  if (loading) {
    return (
      <div 
        style={{ width }} 
        className="flex items-center justify-center animate-pulse bg-gray-200 rounded"
      >
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div 
        style={{ width }} 
        className="flex items-center justify-center bg-gray-100 rounded"
      >
        <div className="text-gray-500">Animation not found</div>
      </div>
    );
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    style: {
      width: width,
    }
  };

  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;