
import React from 'react';

interface ProgressBarProps {
  progress: number; // A number between 0 and 100
}

// A simple progress bar component.
// It might be used for showing loading states or other progress indicators.
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Ensure progress is within the 0-100 range.
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-eco-green h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
