"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-black/5 text-black',
};

export default function OrderDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated" && orderId) {
      fetchOrder();
    }
    // eslint-disable-next-line
  }, [status, orderId, router]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4 text-black">Error</h1>
          <p className="text-black/70 mb-8">{error || "Order not found."}</p>
          <Link
            href="/orders"
            className="inline-block border-2 border-black px-8 py-3 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-8 px-8 text-center border-b border-black/10">
        <Link href="/" className="text-3xl font-serif text-black">Izzles</Link>
      </header>
      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-serif mb-3 text-black">Order #{order.id.slice(-6)}</h1>
          <p className="text-black/70 mb-2">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          <span className={`px-3 py-1 text-sm uppercase tracking-wider rounded font-semibold ${STATUS_STYLES[order.status] || 'bg-black/5 text-black'}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-black/10">
          <h2 className="text-lg font-serif mb-4 text-black">Items</h2>
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
        <div className="mt-8 text-center">
          <Link
            href="/orders"
            className="inline-block border-2 border-black px-8 py-3 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    </div>
  );
} 