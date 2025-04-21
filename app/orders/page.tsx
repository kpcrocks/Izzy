'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4 text-black">Error</h1>
          <p className="text-black/70 mb-8">{error}</p>
          <Link
            href="/"
            className="inline-block border-2 border-black px-8 py-3 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      {/* Header */}
      <header className="w-full py-8 px-8 text-center border-b border-black/10">
        <Link href="/" className="text-3xl font-serif text-black">Izzles</Link>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-3 text-black">Order History</h1>
          <p className="text-black/70">
            View your past orders and their status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black/70 mb-6">You haven't placed any orders yet.</p>
            <Link
              href="/"
              className="inline-block border-2 border-black px-8 py-3 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg border border-black/10"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-serif text-black">
                      Order #{order.id.slice(-6)}
                    </h3>
                    <p className="text-black/70">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 text-sm uppercase tracking-wider ${
                        order.status === 'completed'
                          ? 'bg-black/5 text-black'
                          : order.status === 'pending'
                          ? 'bg-black/5 text-black'
                          : 'bg-black/5 text-black'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="border-t border-black/10 pt-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
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