import Link from 'next/link';
import Card from '@/components/ui/Card';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - Aniflux',
  description: 'Create a new Aniflux account',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white font-heading">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-anime-cyan hover:text-anime-orange transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        <Card variant="gunmetal">
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}
