'use client';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  return (
    <div className="min-h-screen bg-[#f5f5dc] py-12">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-4xl font-serif mb-8 text-black">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black mb-6">Your cart is empty</p>
            <Link 
              href="/shop" 
              className="inline-block border-2 border-black px-8 py-3 text-black hover:bg-black hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center gap-6 bg-white p-6 rounded-lg">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-black">{item.name}</h3>
                    <p className="text-black/70">Size: {item.size}</p>
                    <p className="text-black">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="border rounded px-2 py-1"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 border-t border-black/10 pt-8">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-serif text-black">Total</span>
                <span className="text-2xl font-serif text-black">${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4">
                <Link
                  href="/shop"
                  className="border-2 border-black px-8 py-3 text-black hover:bg-black hover:text-white transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/checkout"
                  className="bg-black px-8 py-3 text-white hover:bg-black/80 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
