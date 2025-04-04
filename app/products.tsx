// app/products.tsx
import ProductCard from './components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Izzle T-Shirt',
    description: 'A comfortable t-shirt with the Izzles logo.',
    price: 19.99,
    image: '/path/to/image1.jpg', // Replace with actual image path
  },
  {
    id: 2,
    name: 'Izzle Mug',
    description: 'A stylish mug for your favorite beverage.',
    price: 12.99,
    image: '/path/to/image2.jpg', // Replace with actual image path
  },
  // Add more products as needed
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}