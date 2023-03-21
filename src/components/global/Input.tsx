import React, { ReactNode } from 'react'
type InputProps = React.ComponentPropsWithRef<'input'>;

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...others }, ref) => {
  return (
    <input 
    ref={ref}
    {...others}
    className={`${className} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
    />
  )
}
)
export default Input