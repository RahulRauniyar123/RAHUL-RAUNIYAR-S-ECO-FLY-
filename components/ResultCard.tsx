import React from 'react';
import type { CalculationResult, FlightDetails } from '../types';
import FlightDetailsCard from './FlightDetailsCard';

interface ResultCardProps {
  result: CalculationResult;
  flightDetails: FlightDetails;
}

// This component displays the final calculation result in a formatted card.
const ResultCard: React.FC<ResultCardProps> = ({ result, flightDetails }) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <FlightDetailsCard flightDetails={flightDetails} />
      
      <div className="my-6 border-t border-gray-200"></div>

      <div className="text-center">
        <p className="text-lg text-gray-700">Your flight emits approximately</p>
        <p className="text-4xl font-bold text-eco-green my-2">
          {result.co2Emissions.toFixed(1)} kg CO₂
        </p>
        <p className="text-sm text-gray-500">
          Flight Distance: {result.distance.toFixed(0)} km | Est. Duration: {Math.floor(result.duration / 60)}h {Math.round(result.duration % 60)}m
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
