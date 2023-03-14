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
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, variants, children, className }, ref) => {
  return (
    <button
      ref={ref}
      type="submit"
      className={clsx(
        `p-2 flex items-center justify-center font-semibold text-white rounded-md tracking-wide ${
          variants === Variant.primary && 'bg-blue-600'
        }`,
        isLoading && 'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait ',
        className
      )}
    >
      {children}
    </button>
  );
});

export default Button;
