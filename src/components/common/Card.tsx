import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <div className={`
      bg-white rounded-xl border border-gray-200 shadow-sm
      ${hover ? 'hover:shadow-md hover:border-gray-300 transition-all duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;