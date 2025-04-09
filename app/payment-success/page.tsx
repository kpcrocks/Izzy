'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function PaymentSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-8 px-8 text-center border-b border-black/10">
        <Link href="/" className="text-3xl font-serif text-black">Izzles</Link>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
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
          <p className="text-black/70 mb-8">
            Your payment has been successfully processed. You will receive an email confirmation shortly.
          </p>
          <div className="space-y-4">
            <Link
              href="/essentials/shop-page"
              className="block w-full bg-black text-white py-3 rounded uppercase tracking-wider hover:bg-black/80 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block text-black/70 hover:text-black"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 