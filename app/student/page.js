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
            <p>ID Number: 123456</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
            <ul>
              <li>CS 101 - Introduction to Programming, Prof. Smith, Mon/Wed/Fri 10:00-11:00 AM</li>
              <li>MATH 200 - Calculus, Prof. Johnson, Tue/Thu 1:00-2:30 PM</li>
              <li>PHYS 150 - Physics, Prof. Lee, Mon/Wed 3:00-4:30 PM</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Past Courses</h2>
            <ul>
              <li>CS 100 - Basics of Computer Science, Prof. Brown, Fall 2023</li>
              <li>ENG 101 - English Literature, Prof. Davis, Spring 2023</li>
              <li>HIST 110 - World History, Prof. Wilson, Fall 2022</li>
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