import React, { useState, useEffect } from 'react';
import { fetchAirportSuggestions } from '../services/geminiService';
import type { AirportSuggestion, Airline } from '../types';
import SuggestionsList from './SuggestionsList';
import { airlines } from '../data/airlines';

interface AirportInputFormProps {
  onCalculate: (from: AirportSuggestion, to: AirportSuggestion, airline: Airline) => void;
  isLoading: boolean;
}

// This component handles the user input for the departure and arrival airports.
// It includes autocomplete suggestions and an airline selector.
const AirportInputForm: React.FC<AirportInputFormProps> = ({ onCalculate, isLoading }) => {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  
  const [fromAirport, setFromAirport] = useState<AirportSuggestion | null>(null);
  const [toAirport, setToAirport] = useState<AirportSuggestion | null>(null);
  const [selectedAirlineId, setSelectedAirlineId] = useState<string>('');

  const [fromSuggestions, setFromSuggestions] = useState<AirportSuggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<AirportSuggestion[]>([]);

  const [isFromLoading, setIsFromLoading] = useState(false);
  const [isToLoading, setIsToLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (fromQuery.length > 1) {
        const fetchSuggestions = async () => {
          setIsFromLoading(true);
          const results = await fetchAirportSuggestions(fromQuery);
          setFromSuggestions(results);
          setIsFromLoading(false);
        };
        fetchSuggestions();
      } else {
        setFromSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [fromQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (toQuery.length > 1) {
        const fetchSuggestions = async () => {
          setIsToLoading(true);
          const results = await fetchAirportSuggestions(toQuery);
          setToSuggestions(results);
          setIsToLoading(false);
        };
        fetchSuggestions();
      } else {
        setToSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [toQuery]);

  const handleSelectSuggestion = (suggestion: AirportSuggestion, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromAirport(suggestion);
      setFromQuery(`${suggestion.city} (${suggestion.iata})`);
      setFromSuggestions([]);
    } else {
      setToAirport(suggestion);
      setToQuery(`${suggestion.city} (${suggestion.iata})`);
      setToSuggestions([]);
    }
    setActiveInput(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAirline = airlines.find(a => a.id === selectedAirlineId);
    if (fromAirport && toAirport && selectedAirline) {
      onCalculate(fromAirport, toAirport, selectedAirline);
    } else {
      alert('Please select valid airports and an airline from the suggestions.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 'From' Airport Input */}
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">🌍 From Airport</label>
          <input
            type="text"
            id="from"
            value={fromQuery}
            onChange={(e) => { setFromQuery(e.target.value); setFromAirport(null); }}
            onFocus={() => setActiveInput('from')}
            onBlur={() => setTimeout(() => { if (activeInput === 'from') setActiveInput(null) }, 200)}
            placeholder="e.g., Kathmandu or KTM"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-eco-green focus:border-eco-green"
            autoComplete="off"
          />
          {activeInput === 'from' && fromQuery.length > 1 && (
            <SuggestionsList suggestions={fromSuggestions} onSelect={(s) => handleSelectSuggestion(s, 'from')} isLoading={isFromLoading} />
          )}
        </div>

        {/* 'To' Airport Input */}
        <div className="relative">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">✈️ To Airport</label>
          <input
            type="text"
            id="to"
            value={toQuery}
            onChange={(e) => { setToQuery(e.target.value); setToAirport(null); }}
            onFocus={() => setActiveInput('to')}
            onBlur={() => setTimeout(() => { if (activeInput === 'to') setActiveInput(null) }, 200)}
            placeholder="e.g., London or LHR"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-eco-green focus:border-eco-green"
            autoComplete="off"
          />
          {activeInput === 'to' && toQuery.length > 1 && (
            <SuggestionsList suggestions={toSuggestions} onSelect={(s) => handleSelectSuggestion(s, 'to')} isLoading={isToLoading} />
          )}
        </div>
      </div>

      {/* Airline Selector */}
      <div className="mb-6">
        <label htmlFor="airline" className="block text-sm font-medium text-gray-700 mb-1">✈️ Select Airline</label>
        <div className="flex items-center space-x-3">
          {selectedAirlineId && !logoError && (
            <img
              src={`https://pics.avs.io/32/32/${selectedAirlineId}.png`}
              alt={`${selectedAirlineId} logo`}
              className="h-8 w-8 object-contain flex-shrink-0"
              onError={() => setLogoError(true)}
            />
          )}
          <select
            id="airline"
            value={selectedAirlineId}
            onChange={(e) => {
              setSelectedAirlineId(e.target.value);
              setLogoError(false);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-eco-green focus:border-eco-green"
          >
            <option value="">-- Select an Airline --</option>
            {airlines.map(airline => (
              <option key={airline.id} value={airline.id}>{airline.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading || !fromAirport || !toAirport || !selectedAirlineId}
          className="px-8 py-3 bg-eco-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? 'Calculating...' : 'Calculate CO₂ Emissions'}
        </button>
      </div>
    </form>
  );
};

export default AirportInputForm;