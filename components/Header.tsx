import React from 'react';

// This component displays the main header for the application.
const Header: React.FC = () => {
  return (
    <header className="text-center py-6 bg-white shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">
        EcoFly ✈️ – Smart CO₂ Calculator for Greener Skies
      </h1>
    </header>
  );
};

export default Header;
