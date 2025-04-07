import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Terms of Service</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
          Please read these terms carefully before using our services.
        </p>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-3xl font-bold mb-4 text-black">Acceptance of Terms</h2>
        <p className="text-black/70 mb-4">By using our services, you agree to these terms.</p>
        
        <h2 className="text-3xl font-bold mb-4 text-black">User Responsibilities</h2>
        <p className="text-black/70 mb-4">You are responsible for maintaining the confidentiality of your account information.</p>
        
        <h2 className="text-3xl font-bold mb-4 text-black">Limitation of Liability</h2>
        <p className="text-black/70 mb-4">We are not liable for any damages resulting from the use of our services.</p>
        
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors mt-8">
          Back to Home
        </Link>
      </main>
    </div>
  );
}
