'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// ✅ load lottie-react only in the browser
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const AnimationLottie = ({ animationPath, width = '95%' }) => {
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        if (animationPath && typeof animationPath === 'object') {
          setAnimationData(animationPath);
          return;
        }
        if (animationPath && typeof animationPath === 'string') {
          const res = await fetch(animationPath);
          const data = await res.json();
          setAnimationData(data);
        }
      } catch (e) {
        console.error('Error loading animation:', e);
      } finally {
        setLoading(false);
      }
    };
    loadAnimation();
  }, [animationPath]);

  if (loading) {
    return (
      <div style={{ width }} className="flex items-center justify-center animate-pulse bg-gray-200 rounded">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div style={{ width }} className="flex items-center justify-center bg-gray-100 rounded">
        <div className="text-gray-500">Animation not found</div>
      </div>
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width }}
    />
  );
};

export default AnimationLottie;
