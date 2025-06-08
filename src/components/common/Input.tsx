import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-all duration-200 bg-white/80 backdrop-blur-sm
          ${error 
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-200 focus:border-primary-500'
          }
          ${className}
        `}
      />
      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;