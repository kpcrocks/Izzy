'use client';

import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery. Items must be unworn and in original condition. Please see our Return Policy page for details.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Orders are processed within 1-2 business days. Shipping times vary by location, but most orders arrive within 3-7 business days.'
  },
  {
    question: 'How can I contact customer service?',
    answer: 'You can reach us via our contact form or by emailing support@izzleshop.com.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within the United States.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive a tracking link via email.'
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f5dc] py-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-serif text-black mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <button
                className="w-full text-left text-lg font-semibold text-black flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                {faq.question}
                <span className="ml-2 text-xl">{openIndex === idx ? '-' : '+'}</span>
              </button>
              {openIndex === idx && (
                <p className="mt-4 text-black/80 text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-black underline hover:text-black/70">Back to Home</Link>
        </div>
      </div>
    </div>
  );
} 