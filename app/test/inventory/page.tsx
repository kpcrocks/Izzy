'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function InventoryTestPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [updateData, setUpdateData] = useState({
    stock: '',
    variants: [] as { id: string; stock: string }[]
  });

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setProducts(data);
      setMessage('Products fetched successfully');
    } catch (error) {
      setMessage('Error fetching products');
    }
  };

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/inventory/${id}`);
      const data = await response.json();
      setSelectedProduct(data);
      setUpdateData({
        stock: data.stock.toString(),
        variants: data.variants.map((v: any) => ({
          id: v.id,
          stock: v.stock.toString()
        }))
      });
      setMessage('Product fetched successfully');
    } catch (error) {
      setMessage('Error fetching product');
    }
  };

  const handleVariantStockChange = (variantId: string, value: string) => {
    setUpdateData(prev => ({
      ...prev,
      variants: prev.variants.map(v => 
        v.id === variantId ? { ...v, stock: value } : v
      )
    }));
  };

  const updateProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock: parseInt(updateData.stock) || undefined,
          variants: updateData.variants.map(v => ({
            id: v.id,
            stock: parseInt(v.stock)
          }))
        })
      });
      const data = await response.json();
      setSelectedProduct(data);
      setMessage('Product updated successfully');
      fetchAllProducts(); // Refresh the list
    } catch (error) {
      setMessage('Error updating product');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await fetch(`/api/inventory/${id}`, {
        method: 'DELETE'
      });
      setMessage('Product deleted successfully');
      setSelectedProduct(null);
      fetchAllProducts();
    } catch (error) {
      setMessage('Error deleting product');
    }
  };

  if (!session) {
    return <div>Please log in to test the inventory endpoints</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory API Test Page</h1>
      
      <div className="mb-4">
        <button
          onClick={fetchAllProducts}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Fetch All Products
        </button>
      </div>

      {message && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">All Products</h2>
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.id} className="border p-2 rounded">
                <div className="font-semibold">{product.name}</div>
                <div>Stock: {product.stock}</div>
                <div className="mt-2">
                  <button
                    onClick={() => fetchProduct(product.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Selected Product</h2>
          {selectedProduct && (
            <div className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <p>Price: ${selectedProduct.price}</p>
              
              <div className="mt-4">
                <label className="block mb-2">
                  Main Stock:
                  <input
                    type="number"
                    value={updateData.stock}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, stock: e.target.value }))}
                    className="border p-1 ml-2"
                  />
                </label>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Variants:</h4>
                <ul className="space-y-2">
                  {selectedProduct.variants.map((variant: any) => (
                    <li key={variant.id} className="border p-2 rounded">
                      <div>Size: {variant.size}</div>
                      <div>Color: {variant.color}</div>
                      <div>
                        Stock:
                        <input
                          type="number"
                          value={updateData.variants.find(v => v.id === variant.id)?.stock || ''}
                          onChange={(e) => handleVariantStockChange(variant.id, e.target.value)}
                          className="border p-1 ml-2"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => updateProduct(selectedProduct.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Update Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 