import Link from 'next/link';
import Image from 'next/image';

export default function MinimalScript() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Minimal Script Tee</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">A simple yet powerful statement piece for your wardrobe.</p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <Image 
            src="/products/minimal-tshirt.jpg" 
            alt="Minimal Script Tee" 
            width={500} 
            height={500} 
            className="rounded-lg"
          />
        </div>
        <p className="text-xl text-black mb-4">$35.00</p>
        <p className="text-black/70 mb-8">Made with high-quality materials, this tee combines comfort with style.</p>
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
