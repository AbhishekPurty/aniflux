'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';
import useCartStore from '@/store/cartStore';

export default function Header() {
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => setSession(data.user));
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Aniflux
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Products
            </Link>
            <Link
              href="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/blog') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Blog
            </Link>
            
            {session && (session.role === 'blog_writer' || session.role === 'admin') && (
              <Link
                href="/admin/blog"
                className={`hover:text-blue-600 transition-colors ${
                  isActive('/admin/blog') ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            )}

            <Link
              href="/cart"
              className="relative hover:text-blue-600 transition-colors text-gray-700"
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/orders">
                  <span className="text-gray-700 hover:text-blue-600">Orders</span>
                </Link>
                <span className="text-gray-600">{session.email}</span>
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" className="text-sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" className="text-sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                className={`hover:text-blue-600 ${
                  isActive('/products') ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/blog"
                className={`hover:text-blue-600 ${
                  isActive('/blog') ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              {session && (session.role === 'blog_writer' || session.role === 'admin') && (
                <Link
                  href="/admin/blog"
                  className={`hover:text-blue-600 ${
                    isActive('/admin/blog') ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              <Link
                href="/cart"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>

              {session ? (
                <>
                  <Link
                    href="/orders"
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <span className="text-gray-600">{session.email}</span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsMenuOpen(false);
                    }}
                    className="text-sm w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="text-sm w-full">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" className="text-sm w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

