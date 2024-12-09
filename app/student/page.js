"use client"

import { useState } from 'react';
import WhatIfAnalysis from '../WhatIfAnalysis';

export default function StudentDashboard() {
  const [showGPAAnalysis, setShowGPAAnalysis] = useState(false);

  const handleGPAAnalysisClick = () => {
    setShowGPAAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <p>Name: John Doe</p>
            <p>Major: Computer Science</p>
            <p>Ranking: Junior</p>
            <p>ID Number: U11</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
            <ul>
              <li>CIS 4935 Fall 2024</li>
              <li>CNT 4104 Fall 2024</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Past Courses</h2>
            <ul>
              <li>COP 2512 Spring 2024</li>
              <li>ZOO 1404 Spring 2024</li>
              <li>CDA 3103 Fall 2023</li>
              <li>ENC 1101 Fall 2023</li>
            </ul>
          </div>

          <div className="col-span-full bg-white p-6 rounded-lg shadow">
            <button 
              onClick={handleGPAAnalysisClick} 
              className="text-blue-500 hover:underline"
            >
              Go to GPA Analysis
            </button>
            {showGPAAnalysis && <WhatIfAnalysis />}
          </div>
        </div>
      </div>
    </div>
  );
}