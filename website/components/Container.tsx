import React from "react"
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function ResponsiveCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-6 sm:p-8 md:p-12 border border-purple-100 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function ResponsiveGrid({
  children,
  cols = 1,
  className = '',
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2 grid-cols-1',
    3: 'md:grid-cols-3 grid-cols-1',
  };

  return (
    <div className={`grid ${colClasses[cols]} gap-6 md:gap-8 ${className}`}>
      {children}
    </div>
  );
}

export function ResponsiveText({
  variant = 'body',
  children,
  className = '',
}: {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small';
  children: React.ReactNode;
  className?: string;
}) {
  const variantClasses = {
    h1: 'text-2xl sm:text-3xl md:text-4xl font-bold',
    h2: 'text-xl sm:text-2xl md:text-3xl font-bold',
    h3: 'text-lg sm:text-xl md:text-2xl font-bold',
    body: 'text-sm sm:text-base md:text-lg',
    small: 'text-xs sm:text-sm md:text-base',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
