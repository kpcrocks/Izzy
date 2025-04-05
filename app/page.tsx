import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-beige">
      {/* Header with Logo */}
      <header className="w-full py-8 px-8 text-center">
        <h1 className="text-4xl font-serif italic mb-2 text-black">Izzles</h1>
        <p className="text-sm text-black uppercase tracking-wider">By Tommy Truong</p>
        
        {/* Social Icons */}
        <div className="absolute top-8 right-8 flex gap-4">
          <Link href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
            </svg>
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="w-full border-y border-gray-200 py-4 mb-12">
        <ul className="flex justify-center space-x-8 text-sm uppercase tracking-wider">
          <li><Link href="/" className="text-black font-medium hover:text-gray-600">Home</Link></li>
          <li><Link href="/fashion" className="text-black hover:text-gray-900">Fashion</Link></li>
          <li><Link href="/lifestyle" className="text-black hover:text-gray-900">Lifestyle</Link></li>
          <li><Link href="/beauty" className="text-black hover:text-gray-900">Beauty</Link></li>
          <li><Link href="/travel" className="text-black hover:text-gray-900">Travel</Link></li>
          <li><Link href="/shop" className="text-black hover:text-gray-900">Shop</Link></li>
        </ul>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Item 1 */}
          <div className="relative group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
              <Image src="/path/to/product1.jpg" alt="Product 1" layout="fill" objectFit="cover" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4">
              <h3 className="text-xl font-serif text-black">Product 1</h3>
            </div>
          </div>

          {/* Featured Item 2 */}
          <div className="relative group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
              <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-300"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4">
              <div className="text-xs text-gray-500 uppercase mb-2">Featured</div>
              <h3 className="text-xl font-serif">Style Guide</h3>
            </div>
          </div>

          {/* Featured Item 3 */}
          <div className="relative group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
              <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-300"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4">
              <div className="text-xs text-gray-500 uppercase mb-2">Trending</div>
              <h3 className="text-xl font-serif">Latest Arrivals</h3>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-4 text-black">Latest from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-black">Blog Post Title 1</h3>
              <p className="text-black">A brief description of the blog post...</p>
              <Link href="/blog/post1" className="text-purple-600 hover:underline">Read More</Link>
            </div>
            {/* Repeat for more blog posts */}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-4 text-black">What Our Customers Say</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="italic text-black">"I love my new products! They are stylish and high quality!"</p>
            <p className="text-right text-black">- Happy Customer</p>
          </div>
          {/* Repeat for more testimonials */}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Stay Updated</h2>
          <p className="mb-4 text-black">Sign up for our newsletter to receive the latest news and exclusive offers.</p>
          <input type="email" placeholder="Your email address" className="border p-2 rounded" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Subscribe</button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-black">© 2023 Izzles. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/about" className="text-black hover:text-gray-900">About</Link>
            <Link href="/contact" className="text-black hover:text-gray-900">Contact</Link>
            <Link href="/privacy" className="text-black hover:text-gray-900">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
