// This file defines the core data structures (types) for our application.
// Using TypeScript types helps prevent bugs by ensuring data is in the correct format.

// Represents a single airport suggestion returned by the Gemini API.
export interface AirportSuggestion {
  iata: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

// Represents a single airline from our static data.
export interface Airline {
  id: string; // This is the IATA code for the airline.
  name: string;
}

// Represents the result of the CO₂ calculation.
export interface CalculationResult {
  distance: number; // in kilometers
  co2Emissions: number; // in kilograms
  duration: number; // in minutes
}

// A composite type to hold all details of a flight for display.
export interface FlightDetails {
  from: AirportSuggestion;
  to: AirportSuggestion;
  airline: Airline;
}
