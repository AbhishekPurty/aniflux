'use client';

import { cn } from '@/lib/utils';

export default function Button({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none font-heading';
  
  const variants = {
    primary: 'bg-anime-orange text-white hover:bg-orange-600 focus:ring-anime-orange shadow-neon-orange hover:shadow-lg',
    secondary: 'bg-anime-blue text-white hover:bg-blue-800 focus:ring-anime-blue shadow-md hover:shadow-lg',
    outline: 'border-2 border-anime-cyan text-anime-cyan hover:bg-anime-cyan hover:text-black focus:ring-anime-cyan',
    danger: 'bg-anime-red text-white hover:bg-red-700 focus:ring-anime-red shadow-md hover:shadow-lg',
    ghost: 'text-white hover:bg-anime-gunmetal focus:ring-anime-cyan',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
