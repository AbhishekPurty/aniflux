'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-48 w-full">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <Button
              variant="primary"
              onClick={handleAddToCart}
              className="text-sm"
            >
              Add to Cart
            </Button>
          ) : (
            <span className="text-sm text-red-600 font-medium">Out of Stock</span>
          )}
        </div>
        
        {product.stock > 0 && product.stock < 10 && (
          <p className="text-xs text-orange-600 mt-2">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}

