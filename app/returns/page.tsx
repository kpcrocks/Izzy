'use client';

import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Return Policy</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
          We want you to love your purchase! If you're not completely satisfied, here's how returns work.
        </p>
      </header>
      <main className="max-w-3xl mx-auto px-8 py-8">
        <h2 className="text-2xl font-serif text-black mb-4">Easy Returns</h2>
        <ul className="list-disc pl-6 text-black/80 space-y-4 mb-8">
          <li>Returns are accepted within <span className="font-semibold">30 days</span> of delivery.</li>
          <li>Items must be <span className="font-semibold">unworn, unwashed, and in original condition</span> with tags attached.</li>
          <li>To start a return, please contact us at <a href="mailto:hello@izzles.com" className="underline">hello@izzles.com</a> with your order number.</li>
          <li>Once your return is received and inspected, we'll notify you about your refund status.</li>
          <li>Refunds are issued to your original payment method within 5-7 business days after approval.</li>
          <li>Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.</li>
        </ul>
        <h2 className="text-2xl font-serif text-black mb-4">Exchanges</h2>
        <ul className="list-disc pl-6 text-black/80 space-y-4 mb-8">
          <li>If you need a different size or color, please contact us to arrange an exchange.</li>
          <li>Exchanges are subject to product availability.</li>
        </ul>
        <h2 className="text-2xl font-serif text-black mb-4">Questions?</h2>
        <p className="text-black/80 mb-8">Reach out to us at <a href="mailto:hello@izzles.com" className="underline">hello@izzles.com</a> and we'll be happy to help!</p>
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
          Back to Home
        </Link>
      </main>
    </div>
  );
} 