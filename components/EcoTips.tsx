import React from 'react';

// This component displays a list of eco-friendly travel tips.
const EcoTips: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 Eco-Friendly Travel Tips</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>🌱 Avoid unnecessary flights; choose lower-emission alternatives like trains where possible.</li>
        <li>✈️ Book nonstop flights on fuel-efficient carriers and choose to fly in economy class.</li>
        <li>🌍 Pack light to reduce the aircraft's weight and bring reusable items to minimize waste.</li>
      </ul>
    </div>
  );
};

export default EcoTips;
