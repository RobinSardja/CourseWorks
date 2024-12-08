"use client"

import { useState } from 'react';
import {createCourse} from '../courses/courses.js';

export default function StaffDashboard() {
  const [coursePrefix, setCoursePrefix] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [credits, setCredits] = useState(3);
  const [departmentId, setDepartmentId] = useState('');  // State for Department ID

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Management Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Department Management</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Manage Courses
              </button>
              <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
                Manage Instructors
              </button>
              <button className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition">
                Manage Departments
              </button>
            </div>
          </div>

          {/* New Course Creation Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Create New Course</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={coursePrefix}
                onChange={(e) => setCoursePrefix(e.target.value)}
                placeholder="Course Prefix (e.g. CS)"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={courseNumber}
                onChange={(e) => setCourseNumber(parseInt(e.target.value))}
                placeholder="Course Number (e.g. 101)"
                className="w-full p-2 border rounded"
              />
              <select
                value={credits}
                onChange={(e) => setCredits(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value={1}>1 Credit</option>
                <option value={2}>2 Credits</option>
                <option value={3}>3 Credits</option>
                <option value={4}>4 Credits</option>
              </select>
              <input
                type="text"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                placeholder="Department ID (e.g. D1)"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => createCourse({coursePrefix, courseNumber, credits, departmentId})}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                Create Course
              </button>
            </div>
          </div>

          {/* System Logs Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">System Logs</h2>
            <div className="overflow-y-auto max-h-48">
              <div className="border-b pb-2 mb-2">
                <p className="text-sm">
                  <span className="font-medium">John Doe</span> added a new course
                </p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="border-b pb-2 mb-2">
                <p className="text-sm">
                  <span className="font-medium">System</span> backed up database
                </p>
                <span className="text-xs text-gray-500">5 hours ago</span>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Jane Smith</span> updated instructor records
                </p>
                <span className="text-xs text-gray-500">10 hours ago</span>
              </div>
            </div>
          </div>

          {/* User Management Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <div className="space-y-4">
              <button className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition">
                Create New User
              </button>
              <button className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">
                Reset User Permissions
              </button>
            </div>
          </div>

          {/* System Overview Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">System Overview</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Users:</span>
                <span className="font-medium">1,254</span>
              </div>
              <div className="flex justify-between">
                <span>Active Courses:</span>
                <span className="font-medium">87</span>
              </div>
              <div className="flex justify-between">
                <span>Departments:</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
