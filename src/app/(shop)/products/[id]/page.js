import Image from 'next/image';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import AddToCartButton from '@/components/shop/AddToCartButton';
import Card from '@/components/ui/Card';

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
        <Card variant="gunmetal" padding="none">
          <div className="relative h-96 w-full bg-black rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">No Image</span>
              </div>
            )}
          </div>
        </Card>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4 font-heading">{product.name}</h1>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-anime-cyan font-heading">
              ${product.price?.toFixed(2)}
            </span>
          </div>

          {product.description && (
            <Card variant="gunmetal" className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-white font-heading">Description</h2>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </Card>
          )}

          {product.category && (
            <div className="mb-6">
              <span className="inline-block bg-anime-orange text-black text-sm font-medium px-3 py-1 rounded-full font-heading">
                {product.category}
              </span>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">
              Stock: <span className={product.stock > 0 ? 'text-anime-cyan font-medium' : 'text-anime-red font-medium'}>
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
