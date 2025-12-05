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
    <div className="bg-anime-gunmetal rounded-lg shadow-md overflow-hidden hover:shadow-neon-orange transition-all duration-200 border border-anime-gunmetal">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-48 w-full bg-black">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-anime-gunmetal flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-white mb-2 hover:text-anime-orange transition-colors font-heading line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-anime-cyan font-heading">
            ${product.price?.toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <Button
              variant="primary"
              onClick={handleAddToCart}
              size="sm"
            >
              Add to Cart
            </Button>
          ) : (
            <span className="text-sm text-anime-red font-medium px-3 py-1.5">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
