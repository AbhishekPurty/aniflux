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
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Aniflux</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Discover amazing products and read insightful blog posts all in one place.
          Your journey to great shopping and reading starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Shop Now
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Read Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card hover>
          <div className="text-center">
            <div className="text-5xl mb-6">🛍️</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Shop Products</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Browse our wide selection of quality products at great prices. 
              Find exactly what you're looking for.
            </p>
            <Link href="/products">
              <Button variant="outline" className="w-full">
                Explore Products →
              </Button>
            </Link>
          </div>
        </Card>

        <Card hover>
          <div className="text-center">
            <div className="text-5xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Read Blog</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Stay updated with our latest articles and insights. 
              Learn something new every day.
            </p>
            <Link href="/blog">
              <Button variant="outline" className="w-full">
                Read Articles →
              </Button>
            </Link>
          </div>
        </Card>

        <Card hover>
          <div className="text-center">
            <div className="text-5xl mb-6">✨</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Easy Shopping</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Simple checkout process and secure payment options. 
              Shop with confidence.
            </p>
            <Link href="/products">
              <Button variant="outline" className="w-full">
                Start Shopping →
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 md:p-16 text-center text-white shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
          Join thousands of satisfied customers and start shopping today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Create Account
            </Button>
          </Link>
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 border-white"
            >
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
