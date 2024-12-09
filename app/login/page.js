"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadUsers, authenticateUser, getUserDashboardPath } from '../utils/authentication';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // Load users when component mounts
  useEffect(() => {
    async function fetchUsers() {
      const loadedUsers = await loadUsers();
      setUsers(loadedUsers);
    }
    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Authenticate user
    const user = authenticateUser(users, username, password);

    if (user) {
      // Get dashboard path based on user role
      const redirectPath = getUserDashboardPath(user.role);

      if (redirectPath) {
        router.push(redirectPath);
      } else {
        setError('Invalid user role');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">CourseWorks Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}