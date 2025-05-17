"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

const STATUS_OPTIONS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "completed",
];

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-black/5 text-black',
};

export default function AdminOrdersPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminSession = localStorage.getItem("admin_session");
      if (adminSession === "true") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("admin_session", "true");
      setError(null);
    } else {
      setError("Incorrect password");
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
          <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-black/80">Login</button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-8 px-8 text-center border-b border-black/10">
        <Link href="/" className="text-3xl font-serif text-black">Izzles Admin</Link>
      </header>
      <main className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-serif mb-8 text-black">All Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black/70 mb-6">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg border border-black/10">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-serif text-black">Order #{order.id.slice(-6)}</h3>
                    <p className="text-black/70">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-black/70">User ID: {order.userId}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-sm uppercase tracking-wider rounded font-semibold ${STATUS_STYLES[order.status] || 'bg-black/5 text-black'}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className="mt-2 px-2 py-1 border border-black/10 rounded"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="border-t border-black/10 pt-6">
                  <div className="space-y-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-serif text-black">Product #{item.productId}</p>
                          <p className="text-black/70">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-black/70">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-black/10 flex justify-between items-center">
                    <span className="text-black/70">Total</span>
                    <span className="font-serif text-xl text-black">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 