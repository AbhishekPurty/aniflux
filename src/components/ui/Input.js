'use client';

import { cn } from '@/lib/utils';

export default function Input({ 
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className,
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-white mb-2 font-heading"
        >
          {label}
          {required && <span className="text-anime-red ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(
          'w-full px-4 py-2.5 border rounded-lg bg-anime-gunmetal text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-anime-cyan focus:border-transparent',
          'transition-all duration-200',
          'disabled:bg-anime-gunmetal disabled:cursor-not-allowed disabled:opacity-50',
          error 
            ? 'border-anime-red focus:ring-anime-red' 
            : 'border-anime-gunmetal hover:border-anime-cyan',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-anime-red flex items-center gap-1">
          <span>⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
