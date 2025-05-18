'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductModal from './components/ProductModal';

interface Variant {
  id?: string;
  size: string;
  color?: string;
  stock: number;
  sku: string;
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sku: string;
  stock: number;
  status: string;
  variants: Variant[];
}

export default function AdminProductsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminSession = localStorage.getItem('admin_session');
      if (adminSession === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('admin_session', 'true');
      setError(null);
    } else {
      setError('Incorrect password');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleSubmitProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      const method = editingProduct ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Failed to save product');
      fetchProducts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to save product');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-serif mb-4 text-black text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-black/10 rounded mb-4"
          />
          {error && <div className="text-red-600 text-sm mb-2 text-center">{error}</div>}
          <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-black/80">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <header className="w-full py-8 px-8 text-center border-b border-black/10">
        <Link href="/" className="text-3xl font-serif text-black">Izzles Admin</Link>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-black">Products</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
          >
            Add Product
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-lg border border-black/10">
              <div className="relative w-full h-48 mb-4">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-serif text-black mb-2">{product.name}</h3>
              <p className="text-black/70 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-black font-medium">${product.price.toFixed(2)}</span>
                <span className={`px-2 py-1 text-sm rounded ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-black/70">SKU: {product.sku}</p>
                <p className="text-sm text-black/70">Stock: {product.stock}
                  {product.stock < 5 && (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded text-xs font-semibold">Low Stock</span>
                  )}
                </p>
                {product.variants.length > 0 && (
                  <p className="text-sm text-black/70">
                    Variants: {product.variants.length}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 px-3 py-1 border border-black/10 rounded hover:bg-black/5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id || '')}
                  className="flex-1 px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ProductModal
        isOpen={showAddModal || !!editingProduct}
        onClose={() => {
          setShowAddModal(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmitProduct}
        product={editingProduct || undefined}
      />
    </div>
  );
} 