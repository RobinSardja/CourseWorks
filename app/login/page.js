"use client"; 

import { useState } from 'react'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userType, setUserType] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // implement proper authentication here
    switch (userType) {
      case 'student':
        router.push('/student');
        break;
      case 'advisor':
        router.push('/advisor');
        break;
      case 'instructor':
        router.push('/instructor');
        break;
      case 'staff':
        router.push('/staff');
        break;
      default:
        alert('Please select a user type');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">CourseWorks Login</h1>
        <div className="space-y-4">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="advisor">Advisor</option>
            <option value="instructor">Instructor</option>
            <option value="staff">Staff</option>
          </select>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
