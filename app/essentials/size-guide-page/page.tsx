import Link from 'next/link';

export default function SizeGuide() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-12 px-8 text-center">
        <h1 className="text-5xl font-serif mb-3 text-black">Size Guide</h1>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
          Find your perfect fit with our size guide below.
        </p>
      </header>
      <main className="max-w-7xl mx-auto px-8 py-8">
        <table className="min-w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Size</th>
              <th className="border border-black px-4 py-2">Chest (inches)</th>
              <th className="border border-black px-4 py-2">Waist (inches)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">S</td>
              <td className="border border-black px-4 py-2">34-36</td>
              <td className="border border-black px-4 py-2">28-30</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">M</td>
              <td className="border border-black px-4 py-2">38-40</td>
              <td className="border border-black px-4 py-2">30-32</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">L</td>
              <td className="border border-black px-4 py-2">42-44</td>
              <td className="border border-black px-4 py-2">32-34</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">XL</td>
              <td className="border border-black px-4 py-2">46-48</td>
              <td className="border border-black px-4 py-2">34-36</td>
            </tr>
          </tbody>
        </table>
        <Link href="/" className="inline-block border-2 border-black px-12 py-4 text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors mt-8">
          Back to Home
        </Link>
      </main>
    </div>
  );
}
