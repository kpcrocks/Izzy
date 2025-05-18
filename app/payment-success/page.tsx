'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSession } from 'next-auth/react';

interface OrderDetails {
  id: string;
  amount_total: number;
  customer_email: string;
  shipping: {
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    name: string;
  };
  items: {
    name: string;
    quantity: number;
    amount: number;
    image: string;
    productId: string;
    variantId?: string;
    description?: string;
  }[];
  created: string;
}

export default function PaymentSuccess() {
  const { clearCart } = useCart();
  const { data: session } = useSession();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();

    // Get the session ID from the URL
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    // Fetch order details
    fetch(`/api/get-order-details?session_id=${sessionId}`)
      .then(res => res.json())
      .then(async data => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }
        setOrderDetails(data);
        // POST to /api/orders to persist order and send email
        if (!orderCreated && data && session?.user?.email) {
          const backendItems = data.items.map((item: any) => ({
            productId: item.productId || item.id || '',
            quantity: item.quantity,
            price: item.amount / 100,
            variantId: item.variantId,
            name: item.name,
            description: item.description,
            image: item.image
          }));
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: data.id,
              items: backendItems,
              shipping: data.shipping,
              total: data.amount_total / 100,
              email: session.user.email,
              customerEmail: data.customer_email,
              createdAt: data.created
            }),
          });
          setOrderCreated(true);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch order details');
        setLoading(false);
      });
  }, [clearCart, session, orderCreated]);

  if (loading) {
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
            className="inline-block bg-black text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-black/80 transition-colors"
          >
            Return to Home
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

      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center mb-8">
            <svg
              className="w-16 h-16 mx-auto mb-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h1 className="text-3xl font-serif mb-4 text-black">Thank You for Your Order!</h1>
            <p className="text-black/70 mb-2">Order #{orderDetails?.id}</p>
            <p className="text-black/70">Placed on {orderDetails?.created}</p>
          </div>

          <div className="border-t border-black/10 pt-8 mb-8">
            <h2 className="text-xl font-serif mb-6 text-black">Order Summary</h2>
            <div className="space-y-6">
              {orderDetails?.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-lg text-black">{item.name}</h3>
                    <p className="text-black/60">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black font-medium">${(item.amount / 100).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-black/10 pt-8 mb-8">
            <h2 className="text-xl font-serif mb-6 text-black">Shipping Details</h2>
            <div className="space-y-2 text-black/70">
              <p>{orderDetails?.shipping.name}</p>
              <p>{orderDetails?.shipping.address.line1}</p>
              {orderDetails?.shipping.address.line2 && (
                <p>{orderDetails.shipping.address.line2}</p>
              )}
              <p>
                {orderDetails?.shipping.address.city}, {orderDetails?.shipping.address.state}{' '}
                {orderDetails?.shipping.address.postal_code}
              </p>
              <p>{orderDetails?.shipping.address.country}</p>
            </div>
          </div>

          <div className="border-t border-black/10 pt-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-serif text-black">Total</span>
              <span className="text-2xl font-serif text-black">
                ${((orderDetails?.amount_total || 0) / 100).toFixed(2)}
              </span>
            </div>
            <div className="space-y-4">
              <Link
                href="/essentials/shop-page"
                className="block w-full bg-black text-white py-3 rounded uppercase tracking-wider hover:bg-black/80 transition-colors text-center"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="block text-center text-black/70 hover:text-black"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 