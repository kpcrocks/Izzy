'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './context/CartContext';
import { toast } from 'react-toastify';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  const { items, addItem } = useCart();
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      {/* Navigation */}
      <nav className="w-full border-y border-black/10 py-3 mb-16">
        <ul className="flex justify-center space-x-2 text-sm uppercase tracking-[0.15em]">
          <li>
            <Link href="/" className="block px-8 py-3 text-black/70 hover:text-black transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="block px-8 py-3 text-black/70 hover:text-black transition-colors">
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="block px-8 py-3 text-black/70 hover:text-black transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block px-8 py-3 text-black/70 hover:text-black transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-32 pt-16">
          <h2 className="text-5xl font-serif mb-8 text-black">Wear Your Journey</h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto mb-12">Each piece tells a story of grace, adventure, and the mountains that move us.</p>
          <Link href="/shop" className="inline-block border-2 border-[#1a2639] px-12 py-4 text-[#1a2639] uppercase tracking-wider hover:bg-[#1a2639] hover:text-white transition-colors">
            Explore Collection
          </Link>
        </div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {/* Grace T-Shirt */}
          <div className="group">
            <Link href="/products/grace-tshirt" className="block cursor-pointer">
              <div className="aspect-[3/4] bg-white mb-4 overflow-hidden relative">
                <Image 
                  src="/products/grace-tshirt.jpg"
                  alt="Saved by Grace T-Shirt" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-black/60 uppercase tracking-wider mb-2">Essential Collection</p>
                <h3 className="text-xl font-serif text-black">Saved by Grace Tee</h3>
                <p className="mt-2 text-black/80">$35.00</p>
              </div>
            </Link>
            <div className="text-center">
              <button 
                onClick={() => {
                  addItem({ id: 'grace-tshirt', name: 'Saved by Grace Tee', price: 35.00, quantity: 1, size: 'M', image: '/products/grace-tshirt.jpg' });
                  toast.success('Added to cart!');
                }} 
                className="mt-4 w-full bg-[#1a2639] text-white py-3 uppercase tracking-wider hover:bg-[#1a2639]/80 transition-colors rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Mountain T-Shirt */}
          <div className="group">
            <Link href="/products/mountain-faith" className="block cursor-pointer">
              <div className="aspect-[3/4] bg-white mb-4 overflow-hidden relative">
                <Image 
                  src="/products/mountain-faith.jpg"
                  alt="Faith Can Move Mountains T-Shirt" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-black/60 uppercase tracking-wider mb-2">New Arrival</p>
                <h3 className="text-xl font-serif text-black">Mountain Faith Tee</h3>
                <p className="mt-2 text-black/80">$35.00</p>
              </div>
            </Link>
            <div className="text-center">
              <button 
                onClick={() => {
                  addItem({ id: 'mountain-faith', name: 'Mountain Faith Tee', price: 35.00, quantity: 1, size: 'M', image: '/products/mountain-faith.jpg' });
                  toast.success('Added to cart!');
                }} 
                className="mt-4 w-full bg-[#1a2639] text-white py-3 uppercase tracking-wider hover:bg-[#1a2639]/80 transition-colors rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Minimal Script */}
          <div className="group">
            <Link href="/products/minimal-script" className="block cursor-pointer">
              <div className="aspect-[3/4] bg-white mb-4 overflow-hidden relative">
                <Image 
                  src="/products/minimal-script.jpg"
                  alt="Minimal Design T-Shirt" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-black/60 uppercase tracking-wider mb-2">Bestseller</p>
                <h3 className="text-xl font-serif text-black">Minimal Script Tee</h3>
                <p className="mt-2 text-black/80">$35.00</p>
              </div>
            </Link>
            <div className="text-center">
              <button 
                onClick={() => {
                  addItem({ id: 'minimal-script', name: 'Minimal Script Tee', price: 35.00, quantity: 1, size: 'M', image: '/products/minimal-script.jpg' });
                  toast.success('Added to cart!');
                }} 
                className="mt-4 w-full bg-[#1a2639] text-white py-3 uppercase tracking-wider hover:bg-[#1a2639]/80 transition-colors rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-24 border-y border-black/10">
          <div className="text-center">
            <h3 className="font-serif text-xl mb-4 text-black">Mindful Design</h3>
            <p className="text-black/70">Every piece is thoughtfully created to inspire and uplift.</p>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-xl mb-4 text-black">Quality Materials</h3>
            <p className="text-black/70">Premium cotton blend for lasting comfort and style.</p>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-xl mb-4 text-black">Made with Purpose</h3>
            <p className="text-black/70">Clothing that carries meaning and spreads positivity.</p>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif mb-6 text-black">Join Our Journey</h2>
          <p className="text-black/70 mb-8">Subscribe to receive updates on new collections, exclusive offers, and stories of inspiration.</p>
          <div className="flex gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-6 py-3 border-2 border-[#1a2639]/10 w-full max-w-sm focus:outline-none focus:border-[#1a2639]"
            />
            <button className="px-8 py-3 bg-[#1a2639] text-white uppercase tracking-wider hover:bg-[#1a2639]/80 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div>
              <h4 className="font-serif text-lg mb-4 text-black">About Izzles</h4>
              <p className="text-black/70">Creating meaningful designs that inspire and connect.</p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4 text-black">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/essentials/shop-page" className="text-black/70 hover:text-[#1a2639]">Shop All</Link></li>
                <li><Link href="/essentials/about-page" className="text-black/70 hover:text-[#1a2639]">Our Story</Link></li>
                <li><Link href="/essentials/contact-page" className="text-black/70 hover:text-[#1a2639]">Contact</Link></li>
                <li><Link href="/essentials/terms-of-service-page" className="text-black/70 hover:text-[#1a2639]">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4 text-black">Customer Care</h4>
              <ul className="space-y-2">
                <li><Link href="/shipping" className="text-black/70 hover:text-[#1a2639]">Shipping Info</Link></li>
                <li><Link href="/returns" className="text-black/70 hover:text-[#1a2639]">Return Policy</Link></li>
                <li><Link href="/essentials/size-guide-page" className="text-black/70 hover:text-[#1a2639]">Size Guide</Link></li>
                <li><Link href="/faq" className="text-black/70 hover:text-[#1a2639]">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4 text-black">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="/instagram" className="text-black/70 hover:text-[#1a2639]">Instagram</Link></li>
                <li><Link href="/facebook" className="text-black/70 hover:text-[#1a2639]">Facebook</Link></li>
                <li><Link href="/twitter" className="text-black/70 hover:text-[#1a2639]">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-16 text-black/60">
            <p>© 2024 Izzles. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
