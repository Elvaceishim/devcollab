import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false
}) => {
  const baseClasses = gradient 
    ? 'card-gradient rounded-2xl border border-white/20 shadow-xl'
    : 'bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg';

  const hoverClasses = hover 
    ? 'hover:shadow-2xl hover:border-gray-300/50 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1' 
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;