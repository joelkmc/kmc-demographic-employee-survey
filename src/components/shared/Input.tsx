import React from 'react';
import { HTMLInputTypeAttribute, HTMLProps } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useFormContext } from 'react-hook-form';

interface InputProps extends HTMLProps<HTMLDivElement> {
  label: string;
  placeholder?: string;
  name: string;
  type?: HTMLInputTypeAttribute | undefined;
  leadingIcon?: JSX.Element | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  leadingIcon,
  prefix,
  suffix,
  ...rest
}) => {
  const formContext = useFormContext();

  const {
    formState: { errors },
    register,
  } = formContext;

  return (
    <div {...rest}>
      <label
        htmlFor={name}
        className="block text-sm font-proxiSemiBold text-gray-600"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}

        {leadingIcon && (
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
              errors[name] ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {leadingIcon}
          </div>
        )}

        <input
          type={type}
          id={name}
          className={`focus:shadow-sm block w-full  border outline-none transition-all sm:text-sm rounded-md p-2 ${
            errors[name]
              ? 'border-red-500 text-red-600 placeholder-red-500 focus:outline-none focus:ring-red-500 focus:border-red-500 pr-10'
              : 'focus:ring-kmc-primary focus:border-kmc-primary border-gray-300 pr-2'
          }
          ${leadingIcon ? 'pl-10' : prefix ? 'pl-16' : 'pl-2'}
          `}
          placeholder={placeholder || label}
          {...register(name)}
        />

        {suffix ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        ) : (
          errors[name] && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )
        )}
      </div>

      {errors[name] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Input;
