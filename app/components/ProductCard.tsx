// app/components/ProductCard.tsx
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
      <Link href={`/payment`} className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg">
        Buy Now
      </Link>
    </div>
  );
}