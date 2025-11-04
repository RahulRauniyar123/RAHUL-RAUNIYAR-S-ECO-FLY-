import React from 'react';
import type { AirportSuggestion } from '../types';
import Loader from './Loader';

interface SuggestionsListProps {
  suggestions: AirportSuggestion[];
  onSelect: (suggestion: AirportSuggestion) => void;
  isLoading: boolean;
}

// This component displays a list of airport suggestions fetched from the Gemini API.
const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
        <li className="px-4 py-2">
           <Loader />
        </li>
      </ul>
    );
  }
  
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.iata}
          className="px-4 py-2 cursor-pointer hover:bg-eco-green hover:text-white"
          onClick={() => onSelect(suggestion)}
          // Using onMouseDown to prevent the input's onBlur from firing before onClick
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="font-semibold">{suggestion.name} ({suggestion.iata})</div>
          <div className="text-sm text-gray-600">{suggestion.city}, {suggestion.country}</div>
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
