'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CartItem from '@/components/shop/CartItem';
import useCartStore from '@/store/cartStore';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4 font-heading">Your Cart</h1>
          <p className="text-gray-400 mb-8">Your cart is empty.</p>
          <Link href="/products">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 font-heading">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="gunmetal" padding="none">
            <div className="divide-y divide-anime-gunmetal">
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card variant="gunmetal">
            <h2 className="text-xl font-semibold mb-4 text-white font-heading">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="text-anime-cyan font-heading">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-gray-400">Calculated at checkout</span>
              </div>
              <div className="border-t border-anime-gunmetal pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span className="text-anime-cyan font-heading">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => router.push('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
