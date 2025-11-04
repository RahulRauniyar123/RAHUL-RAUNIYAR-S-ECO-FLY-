import React from 'react';

// This is a simple loading spinner component to indicate that data is being fetched.
const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-eco-green"></div>
      <span className="ml-3 text-gray-600">Searching...</span>
    </div>
  );
};

export default Loader;
