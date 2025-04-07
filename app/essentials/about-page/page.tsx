import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">About Izzles</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
          At Izzles, we create meaningful designs that inspire and connect. Our mission is to provide high-quality apparel that tells a story.
        </p>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-8">
        <p className="text-black/70 mb-8">
          Founded in [Year], Izzles started with a vision to blend style and purpose. Each piece is crafted with care, ensuring that our customers feel confident and inspired.
        </p>
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
          Back to Home
        </Link>
      </main>
    </div>
  );
}