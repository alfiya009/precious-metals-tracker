import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MetalDetail from './components/MetalDetail';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/metal/:metalType" element={<MetalDetail />} />
      </Routes>
    </div>
  );
}

export default App;
