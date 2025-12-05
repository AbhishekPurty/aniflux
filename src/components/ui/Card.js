'use client';

import { cn } from '@/lib/utils';

export default function Card({ 
  children, 
  className,
  padding = 'default',
  hover = false,
  ...props 
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md border border-gray-200',
        paddingStyles[padding],
        hover && 'hover:shadow-lg transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
