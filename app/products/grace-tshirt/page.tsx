"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function GraceTee() {
  const { addItem } = useCart();
  const product = {
    id: 'grace-tshirt',
    name: 'Saved by Grace Tee',
    price: 35.00,
    image: '/products/grace-tshirt.jpg',
    description: 'A beautiful reminder of faith and resilience.',
    quantity: 1,
    size: 'M',
  };
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Saved by Grace Tee</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">A beautiful reminder of faith and resilience.</p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <Image 
            src="/products/grace-tshirt.jpg" 
            alt="Saved by Grace T-Shirt" 
            width={500} 
            height={500} 
            className="rounded-lg"
          />
        </div>
        <p className="text-xl text-black mb-4">$35.00</p>
        <button
          onClick={() => {
            addItem(product);
            toast.success('Added to cart!');
          }}
          className="mb-6 w-full bg-[#1a2639] text-white py-3 uppercase tracking-wider hover:bg-[#1a2639]/80 transition-colors rounded-sm"
        >
          Add to Cart
        </button>
        <p className="text-black/70 mb-8">Crafted from high-quality materials, this tee combines comfort with a powerful message.</p>
        <Link href="/shop" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
          Back to Shop
        </Link>
      </main>

      <footer className="border-t border-black/10 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-black/60">© 2024 Izzles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
