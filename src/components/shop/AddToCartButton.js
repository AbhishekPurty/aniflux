'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }

    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    toast.success(`Added ${quantity} item(s) to cart!`);
    setQuantity(1);
  };

  const maxQuantity = Math.min(product.stock || 0, 10);

  return (
    <div className="flex items-center gap-4">
      {product.stock > 0 && (
        <div className="flex items-center gap-2">
          <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={maxQuantity}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      
      <Button
        variant="primary"
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className="flex-1"
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </div>
  );
}

