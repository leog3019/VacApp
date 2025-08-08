import React from 'react';
import logo from '../assets/logo.png';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center animate-pulse">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">VacApp</h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="text-purple-200 mt-4">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
