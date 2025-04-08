'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      {/* Header */}
      <header className="w-full py-8 px-8 text-center border-b border-black/10">
        <Link href="/" className="text-3xl font-serif text-black">Izzles</Link>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-serif mb-8 text-black">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-black/70 mb-6">Your cart is empty</p>
            <Link 
              href="/essentials/shop-page" 
              className="inline-block border-2 border-black px-8 py-3 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 bg-white p-4 rounded-lg">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-lg text-black">{item.name}</h3>
                    <p className="text-black/60 text-sm mb-2">{item.size}</p>
                    <div className="flex items-center gap-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="border border-black/10 rounded px-2 py-1"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-black/60 hover:text-black text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-black font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg h-fit">
              <h2 className="text-xl font-serif mb-4 text-black">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-black/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black font-medium pt-3 border-t border-black/10">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                className="w-full bg-black text-white py-3 rounded uppercase tracking-wider hover:bg-black/80 transition-colors"
              >
                Proceed to Checkout
              </button>
              <Link 
                href="/essentials/shop-page" 
                className="block text-center mt-4 text-black/70 hover:text-black text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 