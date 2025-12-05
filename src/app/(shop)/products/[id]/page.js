import Image from 'next/image';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import AddToCartButton from '@/components/shop/AddToCartButton';

export const metadata = {
  title: 'Product Details - Aniflux',
  description: 'Product details page',
};

async function getProduct(id) {
  try {
    // Use relative URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Image</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price?.toFixed(2)}
            </span>
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {product.category && (
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Stock: <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

