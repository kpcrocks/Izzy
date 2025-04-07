import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Contact Us</h1>
        <p className="text-lg text-black uppercase tracking-wider">We'd love to hear from you! Please fill out the form below or reach out to us via email.</p>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-8">
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Your Name" className="border p-2 rounded text-black" required />
          <input type="email" placeholder="Your Email" className="border p-2 rounded text-black" required />
          <textarea placeholder="Your Message" className="border p-2 rounded text-black" rows={4} required></textarea>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-black/80 transition-colors">
            Send Message
          </button>
        </form>
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors mt-8">
          Back to Home
        </Link>
      </main>
    </div>
  );
}
