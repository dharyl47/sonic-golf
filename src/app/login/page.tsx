'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Auto-fill from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    const storedPassword = localStorage.getItem('password') || '';
    setUsername(storedUsername);
    setPassword(storedPassword);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store login data
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    sessionStorage.setItem('isLoggedIn', 'true');
    router.replace('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#E4DFD3]">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {/* 🔧 Development Notice */}
      <p className="text-sm text-gray-700 mb-6 text-center max-w-sm">
        <strong>Note:</strong> This is a staging login. You can use <em>any</em> username and password to proceed.
      </p>

      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-xs gap-4">
        <input
          className="px-4 py-2 rounded border border-gray-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="px-4 py-2 rounded border border-gray-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}
