import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-anime-gunmetal mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-anime-orange mb-4 font-heading">Aniflux</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for amazing products and insightful blog content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-anime-cyan transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-anime-cyan transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-anime-cyan transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-anime-cyan transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-anime-cyan transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-anime-cyan transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@aniflux.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-anime-gunmetal mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Aniflux. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
