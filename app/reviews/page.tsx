'use client';

import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center justify-center">
      <div className="max-w-xl w-full px-8 py-16 bg-white rounded-lg shadow text-center">
        <h1 className="text-4xl font-serif text-black mb-6">Customer Reviews</h1>
        <p className="text-black/70 mb-8">We're working on bringing you a reviews system so you can share your experience and read what others have to say. Stay tuned!</p>
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
} 