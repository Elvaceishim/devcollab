import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 focus:ring-pink-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 focus:ring-purple-500 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 focus:ring-gray-500 bg-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect for primary and secondary buttons */}
      {(variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      )}
      
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;