import React from 'react';

// This is a placeholder component for a future feature to show live flight details.
// It is not currently used in the application but is created to resolve build errors.
const LiveFlightDetailsCard: React.FC = () => {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center mt-4">
      <p className="text-blue-700">
        🛰️ Live flight tracking details will be displayed here in a future update.
      </p>
    </div>
  );
};

export default LiveFlightDetailsCard;
