'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminSession = localStorage.getItem('admin_session');
      if (adminSession === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('admin_session', 'true');
      setError(null);
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-serif mb-4 text-black text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-black/10 rounded mb-4"
          />
          {error && <div className="text-red-600 text-sm mb-2 text-center">{error}</div>}
          <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-black/80">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-8 px-8 text-center border-b border-black/10">
        <Link href="/" className="text-3xl font-serif text-black">Izzles Admin</Link>
      </header>
      <main className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-serif text-black mb-12 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/admin/products" className="block bg-white rounded-lg shadow p-8 text-center hover:bg-black/5 transition">
            <h2 className="text-2xl font-serif text-black mb-2">Product Management</h2>
            <p className="text-black/70">Add, edit, or remove products and manage inventory.</p>
          </Link>
          <Link href="/admin/messages" className="block bg-white rounded-lg shadow p-8 text-center hover:bg-black/5 transition">
            <h2 className="text-2xl font-serif text-black mb-2">Contact Messages</h2>
            <p className="text-black/70">View customer contact form submissions and suggestions.</p>
          </Link>
        </div>
      </main>
    </div>
  );
} 