import ProductGrid from '@/components/shop/ProductGrid';

export const metadata = {
  title: 'Products - Aniflux',
  description: 'Browse our products',
};

async function getProducts() {
  try {
    // Use relative URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return [];
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-600">Discover our amazing collection</p>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
}
