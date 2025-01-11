import React from 'react';

type IconProps = {
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

const Icon = ({
  onClick,
  isActive = false,
  className = '',
  children,
  ...props
}: IconProps) => {
  return (
    <svg
      onClick={onClick}
      className={`cursor-pointer ${isActive ? 'fill-gray-400' : ''} ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
};

export { Icon };
