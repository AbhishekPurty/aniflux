'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loadStripe } from '@stripe/stripe-js';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Zip code is required'),
});

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    // Check if user is authenticated
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        setIsAuthenticated(!!data.user);
        if (data.user?.email) {
          // Pre-fill email if user is logged in
          // This would need to be handled via form defaultValues
        }
      });
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const total = getTotal();

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          total: total,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();

      // Initialize Stripe (if configured)
      if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        
        // Create Stripe checkout session
        const checkoutResponse = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: order.orderId,
            items: items,
            total: total,
          }),
        });

        if (!checkoutResponse.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { sessionId } = await checkoutResponse.json();
        await stripe.redirectToCheckout({ sessionId });
      } else {
        // If Stripe is not configured, just clear cart and show success
        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/orders/${order.orderId}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 font-heading">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="gunmetal">
            <h2 className="text-xl font-semibold mb-4 text-white font-heading">Shipping Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                placeholder="John Doe"
                required
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Address"
                name="address"
                placeholder="123 Main St"
                required
                error={errors.address?.message}
                {...register('address')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  placeholder="New York"
                  required
                  error={errors.city?.message}
                  {...register('city')}
                />

                <Input
                  label="Zip Code"
                  name="zipCode"
                  placeholder="10001"
                  required
                  error={errors.zipCode?.message}
                  {...register('zipCode')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card variant="gunmetal">
            <h2 className="text-xl font-semibold mb-4 text-white font-heading">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm text-gray-300">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium text-anime-cyan">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-anime-gunmetal pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span className="text-anime-cyan font-heading">${total.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
