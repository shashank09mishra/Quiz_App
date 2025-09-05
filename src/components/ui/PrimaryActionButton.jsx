import React from 'react';
import Button from './Button';


const PrimaryActionButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'default',
  size = 'lg',
  iconName,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-success hover:bg-success/90 text-success-foreground';
      case 'warning':
        return 'bg-warning hover:bg-warning/90 text-warning-foreground';
      case 'secondary':
        return 'bg-secondary hover:bg-secondary/90 text-secondary-foreground';
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <div className={`flex justify-center ${fullWidth ? 'w-full' : ''}`}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        iconName={iconName}
        iconPosition={iconPosition}
        className={`
          font-semibold shadow-md hover:shadow-lg transform hover:scale-105 
          transition-all duration-150 ease-out focus:ring-2 focus:ring-offset-2 
          focus:ring-primary/50 disabled:transform-none disabled:shadow-none
          ${fullWidth ? 'w-full' : 'min-w-[140px]'}
          ${className}
        `}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export default PrimaryActionButton;