import Link from 'next/link';

export default function Shop() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Shop Our Collection</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
          Explore our range of thoughtfully designed apparel that tells a story.
        </p>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Add product links here */}
        <Link href="/products/grace" className="block text-xl text-black mb-4">Saved by Grace Tee</Link>
        <Link href="/products/mountain-faith" className="block text-xl text-black mb-4">Mountain Faith Tee</Link>
        <Link href="/products/minimal-script" className="block text-xl text-black mb-4">Minimal Script Tee</Link>
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors mt-8">
          Back to Home
        </Link>
      </main>
    </div>
  );
}
