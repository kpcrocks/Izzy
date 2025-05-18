'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
  product?: Product;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}: ProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    images: [],
    sku: '',
    stock: 0,
    status: 'active',
    variants: [],
  });

  const [newVariant, setNewVariant] = useState<Variant>({
    size: '',
    color: '',
    stock: 0,
    sku: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        sku: product.sku,
        stock: product.stock,
        status: product.status,
        variants: product.variants,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVariant = () => {
    if (!newVariant.size || !newVariant.sku) {
      setError('Size and SKU are required for variants');
      return;
    }

    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));

    setNewVariant({
      size: '',
      color: '',
      stock: 0,
      sku: '',
    });
  };

  const handleRemoveVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-serif mb-6">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-black/10 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-black/10 rounded"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-black/10 rounded"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={e => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full px-3 py-2 border border-black/10 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={e => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-black/10 rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-black/10 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index),
                    }))}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Image URL"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const input = e.target as HTMLInputElement;
                  if (input.value) {
                    setFormData(prev => ({
                      ...prev,
                      images: [...prev.images, input.value],
                    }));
                    input.value = '';
                  }
                }
              }}
              className="w-full px-3 py-2 border border-black/10 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Variants</label>
            <div className="space-y-4">
              {formData.variants.map((variant, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-black/10 rounded">
                  <div className="flex-1">
                    <p className="font-medium">Size: {variant.size}</p>
                    {variant.color && <p>Color: {variant.color}</p>}
                    <p>Stock: {variant.stock}</p>
                    <p>SKU: {variant.sku}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Size"
                  value={newVariant.size}
                  onChange={e => setNewVariant(prev => ({ ...prev, size: e.target.value }))}
                  className="px-3 py-2 border border-black/10 rounded"
                />
                <input
                  type="text"
                  placeholder="Color (optional)"
                  value={newVariant.color}
                  onChange={e => setNewVariant(prev => ({ ...prev, color: e.target.value }))}
                  className="px-3 py-2 border border-black/10 rounded"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newVariant.stock}
                  onChange={e => setNewVariant(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                  className="px-3 py-2 border border-black/10 rounded"
                  min="0"
                />
                <input
                  type="text"
                  placeholder="SKU"
                  value={newVariant.sku}
                  onChange={e => setNewVariant(prev => ({ ...prev, sku: e.target.value }))}
                  className="px-3 py-2 border border-black/10 rounded"
                />
              </div>
              <button
                type="button"
                onClick={handleAddVariant}
                className="w-full py-2 border border-black/10 rounded hover:bg-black/5"
              >
                Add Variant
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black/10 rounded hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded hover:bg-black/80 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 