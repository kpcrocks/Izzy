'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './context/CartContext';
import { toast } from 'react-toastify';

export default function Home() {
  const { items, addItem } = useCart();

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      {/* Header with Logo */}
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Izzles</h1>
        <p className="text-sm text-black uppercase tracking-[0.2em]">Minimalist Designs for the Soul</p>
        
        {/* Social Icons */}
        <div className="absolute top-8 right-8 flex gap-4 items-center">
          <Link href="/cart" className="text-gray-400 hover:text-gray-600 relative">
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
            </svg>
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="w-full border-y border-black/10 py-6 mb-16">
        <ul className="flex justify-center space-x-12 text-sm uppercase tracking-[0.15em]">
          <li><Link href="/" className="text-black hover:text-black/60 transition-colors">Home</Link></li>
          <li><Link href="/essentials/shop-page" className="text-black hover:text-black/60 transition-colors">Shop</Link></li>
          <li><Link href="/essentials/about-page" className="text-black hover:text-black/60 transition-colors">Our Story</Link></li>
          <li><Link href="/essentials/contact-page" className="text-black hover:text-black/60 transition-colors">Contact</Link></li>
        </ul>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-serif mb-6 text-black">Wear Your Journey</h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">Each piece tells a story of grace, adventure, and the mountains that move us.</p>
          <Link href="/shop" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
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
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
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
                className="mt-4 w-full bg-black text-white py-3 uppercase tracking-wider hover:bg-black/80 transition-colors rounded-sm"
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
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
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
                className="mt-4 w-full bg-black text-white py-3 uppercase tracking-wider hover:bg-black/80 transition-colors rounded-sm"
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
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
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
                className="mt-4 w-full bg-black text-white py-3 uppercase tracking-wider hover:bg-black/80 transition-colors rounded-sm"
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
              className="px-6 py-3 border-2 border-black/10 w-full max-w-sm focus:outline-none focus:border-black"
            />
            <button className="px-8 py-3 bg-black text-white uppercase tracking-wider hover:bg-black/80 transition-colors">
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
                <li><Link href="/essentials/shop-page" className="text-black/70 hover:text-black">Shop All</Link></li>
                <li><Link href="/essentials/about-page" className="text-black/70 hover:text-black">Our Story</Link></li>
                <li><Link href="/essentials/contact-page" className="text-black/70 hover:text-black">Contact</Link></li>
                <li><Link href="/essentials/terms-of-service-page" className="text-black/70 hover:text-black">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4 text-black">Customer Care</h4>
              <ul className="space-y-2">
                <li><Link href="/shipping" className="text-black/70 hover:text-black">Shipping Info</Link></li>
                <li><Link href="/returns" className="text-black/70 hover:text-black">Returns</Link></li>
                <li><Link href="/essentials/size-guide-page" className="text-black/70 hover:text-black">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4 text-black">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="/instagram" className="text-black/70 hover:text-black">Instagram</Link></li>
                <li><Link href="/facebook" className="text-black/70 hover:text-black">Facebook</Link></li>
                <li><Link href="/twitter" className="text-black/70 hover:text-black">Twitter</Link></li>
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
