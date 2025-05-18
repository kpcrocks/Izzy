"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-black/5 text-black',
};

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  description?: string;
  image?: string;
  variantId?: string;
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  customerEmail: string;
  items: OrderItem[];
  shipping?: {
    name: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

export default function OrderDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

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

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    setCancelling(true);
    setCancelError(null);

    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to cancel order');
      }

      const updatedOrder = await response.json();
      setOrder(updatedOrder);
      router.refresh();
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  const canCancelOrder = order && 
    order.status !== 'cancelled' && 
    order.status !== 'shipped' && 
    order.status !== 'delivered' &&
    new Date().getTime() - new Date(order.createdAt).getTime() <= 24 * 60 * 60 * 1000; // 24 hours

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
          <p className="text-black/70 mb-2">Email: {order.customerEmail}</p>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 text-sm uppercase tracking-wider rounded font-semibold ${STATUS_STYLES[order.status] || 'bg-black/5 text-black'}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            {canCancelOrder && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="px-4 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}
          </div>
          {cancelError && (
            <p className="mt-2 text-sm text-red-600">{cancelError}</p>
          )}
        </div>

        <div className="space-y-8">
          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg border border-black/10">
            <h2 className="text-lg font-serif mb-4 text-black">Items</h2>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  {item.image && (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-serif text-lg text-black">{item.name}</h3>
                    {item.description && (
                      <p className="text-black/60 text-sm mb-1">{item.description}</p>
                    )}
                    <p className="text-black/60">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black font-medium">${item.price.toFixed(2)}</p>
                    <p className="text-black/60 text-sm">${(item.price * item.quantity).toFixed(2)} total</p>
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

          {/* Shipping Information */}
          {order.shipping && (
            <div className="bg-white p-6 rounded-lg border border-black/10">
              <h2 className="text-lg font-serif mb-4 text-black">Shipping Information</h2>
              <div className="space-y-2 text-black/70">
                <p className="font-medium text-black">{order.shipping.name}</p>
                <p>{order.shipping.address.line1}</p>
                {order.shipping.address.line2 && (
                  <p>{order.shipping.address.line2}</p>
                )}
                <p>
                  {order.shipping.address.city}, {order.shipping.address.state}{' '}
                  {order.shipping.address.postalCode}
                </p>
                <p>{order.shipping.address.country}</p>
              </div>
            </div>
          )}
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