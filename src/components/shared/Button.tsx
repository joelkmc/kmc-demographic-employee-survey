import React, { HTMLProps } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  isLoading?: boolean | undefined;
  disabled?: boolean | undefined;
  buttonType?: 'primary' | 'dark';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = ({
  isLoading,
  disabled,
  buttonType = 'primary',
  children,
  className,
  ...rest
}) => {
  const buttonStyles = {
    primary: 'bg-primary ring-primary text-white',
    dark: 'border border-gray-400 text-gray-400 hover:text-white hover:bg-gray-400 transition-all',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`justify-center disabled:bg-opacity-50 outline-none px-10 py-2 rounded-md focus:ring-2  ring-opacity-20 shadow-sm hover:shadow-md focus:shadow-md transition-all flex items-center ${buttonStyles[buttonType]} ${className}`}
      {...rest}
    >
      {isLoading && <AiOutlineLoading className='animate-spin text-white' />}
      <span
        className={`font-barlow font-bold transition-all ${
          isLoading ? 'pl-3' : 'pl-0'
        }`}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
