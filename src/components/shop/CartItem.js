'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import useCartStore from '@/store/cartStore';

export default function CartItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item._id, newQuantity);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <Link href={`/products/${item._id}`}>
        <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item._id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 truncate">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600">${item.price?.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 p-0"
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 p-0"
            disabled={item.stock !== undefined && item.quantity >= item.stock}
          >
            +
          </Button>
        </div>

        <div className="w-24 text-right">
          <p className="font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <Button
          variant="danger"
          onClick={() => removeItem(item._id)}
          className="ml-2"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

