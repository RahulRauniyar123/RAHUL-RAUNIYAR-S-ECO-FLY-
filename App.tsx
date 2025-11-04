import React, { useState } from 'react';
import Header from './components/Header';
import AirportInputForm from './components/AirportInputForm';
import ResultCard from './components/ResultCard';
import EcoTips from './components/EcoTips';
import MapAnimation from './components/MapAnimation';
import { calculateFlightMetrics } from './services/calculationService';
import type { AirportSuggestion, Airline, CalculationResult, FlightDetails } from './types';

// This is the main component of our EcoFly application.
// It manages the state and brings all the other components together.
const App: React.FC = () => {
  // State to manage the loading status while calculating.
  const [isLoading, setIsLoading] = useState(false);
  
  // State to store the result of the CO₂ calculation.
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  // State to store the details of the selected flight (from, to, airline).
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);

  // This function is triggered when the user submits the form.
  const handleCalculate = (from: AirportSuggestion, to: AirportSuggestion, airline: Airline) => {
    setIsLoading(true);
    setCalculationResult(null); // Clear previous results
    setFlightDetails({ from, to, airline });

    // We simulate a short delay to make the loading animation visible.
    // This provides a better user experience.
    setTimeout(() => {
      const result = calculateFlightMetrics(from, to);
      setCalculationResult(result);
      setIsLoading(false);
    }, 500); // 0.5 second delay
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-2xl">
        <p className="text-center text-gray-600 mb-6">
          🌱 Welcome to EcoFly! Enter your flight details below to estimate its carbon footprint and learn how to travel more sustainably.
        </p>
        
        {/* The main input form for airport and airline selection. */}
        <AirportInputForm onCalculate={handleCalculate} isLoading={isLoading} />

        {/* This section displays the result after calculation. */}
        {/* It only appears if we have a result. */}
        {calculationResult && flightDetails && (
          <>
            <ResultCard result={calculationResult} flightDetails={flightDetails} />
            <MapAnimation />
            <EcoTips />
          </>
        )}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Built with 💚 for a sustainable future. EcoFly AI Project.</p>
      </footer>

      {/* Watermark with cool sparkling animation */}
      <div className="fixed bottom-4 right-4 text-red-500 font-handwriting text-2xl animate-sparkle select-none pointer-events-none">
        POWERED BY RAHUl_Rynair
      </div>
    </div>
  );
};

export default App;