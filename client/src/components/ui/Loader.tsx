import { HTMLAttributes } from 'react';

import clsx from 'clsx';

type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
  size?: LoaderSize;
}

const sizeMap: Record<LoaderSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
};

export const Loader = ({ size = 'md', className, ...props }: LoaderProps) => {
  return (
    <span
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-brand border-t-transparent text-brand',
        sizeMap[size],
        className,
      )}
      {...props}
    />
  );
};
