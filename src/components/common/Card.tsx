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
      bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg
      ${hover ? 'hover:shadow-2xl hover:border-gray-300/50 hover:bg-white transition-all duration-300 transform hover:scale-[1.02]' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;