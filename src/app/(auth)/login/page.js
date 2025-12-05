import Link from 'next/link';
import Card from '@/components/ui/Card';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - Aniflux',
  description: 'Login to your Aniflux account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white font-heading">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{' '}
            <Link href="/register" className="font-medium text-anime-cyan hover:text-anime-orange transition-colors">
              create a new account
            </Link>
          </p>
        </div>
        <Card variant="gunmetal">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
