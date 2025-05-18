'use client';

import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Shipping Information</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
          Everything you need to know about shipping your order with Izzles.
        </p>
      </header>
      <main className="max-w-3xl mx-auto px-8 py-8">
        <h2 className="text-2xl font-serif text-black mb-4">Shipping Times</h2>
        <ul className="list-disc pl-6 text-black/80 space-y-4 mb-8">
          <li>Orders are processed within <span className="font-semibold">1-2 business days</span>.</li>
          <li>Standard shipping typically takes <span className="font-semibold">3-7 business days</span> after dispatch.</li>
          <li>You'll receive a tracking link by email once your order ships.</li>
        </ul>
        <h2 className="text-2xl font-serif text-black mb-4">Shipping Costs</h2>
        <ul className="list-disc pl-6 text-black/80 space-y-4 mb-8">
          <li>Shipping is <span className="font-semibold">free</span> on all orders over $75.</li>
          <li>For orders under $75, a flat shipping rate of $5 applies.</li>
          <li>Currently, we only ship within the United States.</li>
        </ul>
        <h2 className="text-2xl font-serif text-black mb-4">Questions?</h2>
        <p className="text-black/80 mb-8">If you have any questions about shipping, please contact us at <a href="mailto:hello@izzles.com" className="underline">hello@izzles.com</a>.</p>
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
          Back to Home
        </Link>
      </main>
    </div>
  );
} 