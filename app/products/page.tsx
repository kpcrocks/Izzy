'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const products = [
  {
    id: 'grace-tshirt',
    name: 'Saved by Grace Tee',
    price: 35.00,
    category: 'Essential Collection',
    image: '/products/grace-tshirt.jpg',
    description: 'A reminder of divine grace in everyday moments.'
  },
  {
    id: 'mountain-faith',
    name: 'Mountain Faith Tee',
    price: 35.00,
    category: 'New Arrival',
    image: '/products/mountain-faith.jpg',
    description: 'For those who know that faith can move mountains.'
  },
  {
    id: 'minimal-script',
    name: 'Minimal Script Tee',
    price: 35.00,
    category: 'Bestseller',
    image: '/products/minimal-script.jpg',
    description: 'Simple, elegant, and meaningful design for everyday wear.'
  }
];

const categories = ['All', 'Essential Collection', 'New Arrival', 'Bestseller'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItem } = useCart();

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5f5dc] py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-black mb-4">Our Collection</h1>
          <p className="text-black/70">Thoughtfully designed pieces for your journey.</p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-8 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm uppercase tracking-[0.15em] ${
                selectedCategory === category
                  ? 'text-[#1a2639]'
                  : 'text-black/70 hover:text-[#1a2639]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[3/4] bg-white mb-4 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-black/60 uppercase tracking-wider mb-2">{product.category}</p>
                <h3 className="text-xl font-serif text-black">{product.name}</h3>
                <p className="mt-2 text-black/80">${product.price.toFixed(2)}</p>
                <p className="mt-3 text-black/70 text-sm">{product.description}</p>
                <button
                  onClick={() => {
                    addItem({ ...product, quantity: 1, size: 'M' });
                    toast.success('Added to cart!');
                  }}
                  className="mt-4 w-full bg-[#1a2639] text-white py-3 uppercase tracking-wider hover:bg-[#1a2639]/80 transition-colors rounded-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 