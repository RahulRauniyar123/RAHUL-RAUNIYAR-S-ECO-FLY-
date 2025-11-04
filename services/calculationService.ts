// This file contains the core logic for calculating flight distance and CO₂ emissions.

import type { AirportSuggestion, CalculationResult } from '../types';
import { CO2_EMISSION_FACTOR_PER_KM, AVERAGE_FLIGHT_SPEED_KMH } from '../constants';

/**
 * Calculates the great-circle distance between two points on the Earth using the Haversine formula.
 * This is a standard way to calculate distances on a sphere.
 * @param lat1 Latitude of the starting point.
 * @param lon1 Longitude of the starting point.
 * @param lat2 Latitude of the ending point.
 * @param lon2 Longitude of the ending point.
 * @returns The distance in kilometers.
 */
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers.
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

/**
 * Calculates all the key metrics for a flight based on departure and arrival airports.
 * @param from The departure airport details.
 * @param to The arrival airport details.
 * @returns A CalculationResult object containing distance, CO₂ emissions, and estimated duration.
 */
export const calculateFlightMetrics = (from: AirportSuggestion, to: AirportSuggestion): CalculationResult => {
  // Step 1: Calculate the distance using the Haversine formula.
  const distance = haversineDistance(from.lat, from.lon, to.lat, to.lon);
  
  // Step 2: Estimate CO₂ emissions based on the distance.
  const co2Emissions = distance * CO2_EMISSION_FACTOR_PER_KM;
  
  // Step 3: Estimate the flight duration based on average speed.
  const duration = (distance / AVERAGE_FLIGHT_SPEED_KMH) * 60; // Convert hours to minutes.

  return {
    distance,
    co2Emissions,
    duration,
  };
};
