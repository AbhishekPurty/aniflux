'use client';

import { cn } from '@/lib/utils';

export default function Card({ 
  children, 
  className,
  padding = 'default',
  hover = false,
  variant = 'default', // 'default', 'gunmetal', 'white'
  ...props 
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const variantStyles = {
    default: 'bg-anime-gunmetal border border-anime-gunmetal',
    gunmetal: 'bg-anime-gunmetal border border-anime-gunmetal',
    white: 'bg-white text-black border border-gray-200',
  };

  return (
    <div
      className={cn(
        'rounded-lg shadow-md',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'hover:shadow-neon-orange transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
