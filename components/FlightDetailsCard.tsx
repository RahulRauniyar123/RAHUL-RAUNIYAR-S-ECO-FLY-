import React from 'react';
import type { FlightDetails } from '../types';

interface FlightDetailsCardProps {
  flightDetails: FlightDetails;
}

// This component displays the details of the selected flight route.
const FlightDetailsCard: React.FC<FlightDetailsCardProps> = ({ flightDetails }) => {
  const { from, to, airline } = flightDetails;

  return (
    <>
      {/* Airline Info */}
      <div className="flex justify-center items-center mb-4 space-x-3">
        <img 
          src={`https://pics.avs.io/48/48/${airline.id}.png`} 
          alt={`${airline.name} logo`} 
          className="h-10 w-10 object-contain"
          // Hide if the logo fails to load
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <h3 className="text-xl font-semibold text-gray-700">{airline.name}</h3>
      </div>

      {/* Route Info */}
      <div className="grid grid-cols-3 items-center gap-4 text-center">
        {/* From Airport */}
        <div className="text-gray-700 text-left">
          <p className="font-bold text-2xl">{from.iata}</p>
          <p className="text-sm text-gray-500 truncate">{from.city}</p>
        </div>

        {/* Flight Icon */}
        <div className="text-2xl text-eco-green flex items-center justify-center">
          <span className="border-t border-gray-300 border-dashed flex-grow"></span>
          <span className="mx-2">✈️</span>
          <span className="border-t border-gray-300 border-dashed flex-grow"></span>
        </div>

        {/* To Airport */}
        <div className="text-gray-700 text-right">
          <p className="font-bold text-2xl">{to.iata}</p>
          <p className="text-sm text-gray-500 truncate">{to.city}</p>
        </div>
      </div>
    </>
  );
};

export default FlightDetailsCard;