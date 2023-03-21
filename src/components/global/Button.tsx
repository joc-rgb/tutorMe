import clsx from 'clsx';
import React, { ReactNode } from 'react';

export enum Variant {
  'primary',
  'outline',
  'secondary',
  'light',
  'dark'
}

type ButtonProps = {
  isLoading?: boolean;
  children: ReactNode;
  variants?: Variant;
} & React.ComponentPropsWithRef<'button'>;

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, variants, children, className,...others }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(className,
        `p-2 px-4 flex items-center justify-center font-semibold rounded-md tracking-wide text-blue-700 
        ${
          variants === Variant.primary && 'bg-blue-600 text-white hover:bg-blue-800'}
          ${  variants===Variant.outline && 'border border-blue-600 hover:bg-gray-50'}
       `,
        isLoading && 'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait ',

      )}
      {...others}
    >
      {children}
    </button>
  );
});

export default Button;
