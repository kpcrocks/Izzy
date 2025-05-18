'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminSession = localStorage.getItem('admin_session');
      if (adminSession === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

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

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
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
        <Link href="/admin" className="text-3xl font-serif text-black">Izzles Admin</Link>
      </header>
      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-serif text-black mb-8 text-center">Contact Messages</h1>
        {loading ? (
          <div className="text-center text-black/70">Loading messages...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-black/70">No messages found.</div>
        ) : (
          <div className="space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-black">{msg.name}</span>
                  <span className="text-xs text-black/50">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <div className="mb-2 text-black/70 text-sm">{msg.email}</div>
                <div className="text-black/90 whitespace-pre-line">{msg.message}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 