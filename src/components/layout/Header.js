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
    <header className="bg-black border-b border-anime-gunmetal sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-anime-orange hover:text-anime-cyan transition-colors font-heading">
            Aniflux
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors font-heading ${
                isActive('/products') 
                  ? 'text-anime-orange bg-anime-gunmetal' 
                  : 'text-white hover:text-anime-cyan hover:bg-anime-gunmetal'
              }`}
            >
              Products
            </Link>
            <Link
              href="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors font-heading ${
                isActive('/blog') 
                  ? 'text-anime-orange bg-anime-gunmetal' 
                  : 'text-white hover:text-anime-cyan hover:bg-anime-gunmetal'
              }`}
            >
              Blog
            </Link>
            
            {session && (session.role === 'blog_writer' || session.role === 'admin') && (
              <Link
                href="/admin/blog"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors font-heading ${
                  isActive('/admin/blog') 
                    ? 'text-anime-orange bg-anime-gunmetal' 
                    : 'text-white hover:text-anime-cyan hover:bg-anime-gunmetal'
                }`}
              >
                Dashboard
              </Link>
            )}

            <Link
              href="/cart"
              className="relative text-white hover:text-anime-cyan transition-colors font-heading"
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-anime-cyan text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-neon-cyan">
                  {itemCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/orders" className="text-white hover:text-anime-cyan transition-colors">
                  Orders
                </Link>
                <span className="text-gray-400 text-sm">{session.email}</span>
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-anime-cyan"
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
          <div className="md:hidden py-4 border-t border-anime-gunmetal">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                className={`px-3 py-2 rounded-md font-heading ${
                  isActive('/products') ? 'text-anime-orange bg-anime-gunmetal' : 'text-white hover:text-anime-cyan'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/blog"
                className={`px-3 py-2 rounded-md font-heading ${
                  isActive('/blog') ? 'text-anime-orange bg-anime-gunmetal' : 'text-white hover:text-anime-cyan'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              {session && (session.role === 'blog_writer' || session.role === 'admin') && (
                <Link
                  href="/admin/blog"
                  className={`px-3 py-2 rounded-md font-heading ${
                    isActive('/admin/blog') ? 'text-anime-orange bg-anime-gunmetal' : 'text-white hover:text-anime-cyan'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              <Link
                href="/cart"
                className="text-white hover:text-anime-cyan px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>

              {session ? (
                <>
                  <Link
                    href="/orders"
                    className="text-white hover:text-anime-cyan px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <span className="text-gray-400 text-sm px-3 py-2">{session.email}</span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsMenuOpen(false);
                    }}
                    size="sm"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">Register</Button>
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
