import { useState, useEffect } from 'react';

let loadedImages = 0;

/**
 * useImagePreload Hook
 * @param {string[]} imageUrls - Array of image URLs to preload.
 * @returns {number} The loading progress (0 to 100).
 */
function useImagePreload(imageUrls: string[]) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!imageUrls.length) return;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.onload = () => {
        loadedImages += 1;
        setProgress((loadedImages / imageUrls.length) * 100);
      };
      // @ts-ignore
      img.onerror = img.onload;
      img.src = url;
    });
  }, [imageUrls]);

  return {
    preloaded: loadedImages === imageUrls.length,
    progress: `${progress.toString().split('').slice(0, 4).join('')}%`,
  };
}

export default useImagePreload;
