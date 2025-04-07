import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Privacy Policy</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
          Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
        </p>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-3xl font-bold mb-4 text-black">Information We Collect</h2>
        <p className="text-black/70 mb-4">We collect personal information when you register, place an order, or subscribe to our newsletter.</p>
        
        <h2 className="text-3xl font-bold mb-4 text-black">How We Use Your Information</h2>
        <p className="text-black/70 mb-4">Your information helps us process your orders and improve our services.</p>
        
        <h2 className="text-3xl font-bold mb-4 text-black">Data Protection</h2>
        <p className="text-black/70 mb-4">We implement various security measures to protect your personal information.</p>
        
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors mt-8">
          Back to Home
        </Link>
      </main>
    </div>
  );
}
