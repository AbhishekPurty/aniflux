import Link from 'next/link';
import Card from '@/components/ui/Card';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - Aniflux',
  description: 'Login to your Aniflux account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        <Card>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
