import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Home - Aniflux',
  description: 'Welcome to Aniflux - Your one-stop shop for amazing products and insightful blog content',
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Aniflux
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing products and read insightful blog posts all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <Button variant="primary" className="text-lg px-8 py-3">
              Shop Now
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" className="text-lg px-8 py-3">
              Read Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <div className="text-center">
            <div className="text-4xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2">Shop Products</h3>
            <p className="text-gray-600">
              Browse our wide selection of quality products at great prices.
            </p>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Explore Products →
            </Link>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Read Blog</h3>
            <p className="text-gray-600">
              Stay updated with our latest articles and insights.
            </p>
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Read Articles →
            </Link>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
            <p className="text-gray-600">
              Simple checkout process and secure payment options.
            </p>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Start Shopping →
            </Link>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 rounded-lg p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers and start shopping today!
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button variant="secondary" className="text-lg px-8 py-3">
              Create Account
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
