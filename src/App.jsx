import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Audit from './pages/Audit';

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/analysis" element={<Analysis/>} />
          <Route path="/audit" element={<Audit/>} />
        </Routes>
      </div>
    </div>
  );
}