import React from 'react';
import { Icon } from './Icon';

type ArrowIconProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

const ArrowIcon = ({ className = '', ...props }: ArrowIconProps) => {
  return (
    <Icon
      className={className}
      width="21"
      height="21"
      fill="currentColor"
      stroke="#8899a4"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </Icon>
  );
};

export { ArrowIcon };
