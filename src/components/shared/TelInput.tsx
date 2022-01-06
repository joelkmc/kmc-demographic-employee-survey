import React, { HTMLProps } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useFormContext } from 'react-hook-form';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

interface InputProps extends HTMLProps<HTMLDivElement> {
  label: string;
  placeholder?: string;
  name: string;
  leadingIcon?: JSX.Element | undefined;
}

const TelInput: React.FC<InputProps> = ({
  label,
  name,
  leadingIcon,
  prefix,
  ...rest
}) => {
  const formContext = useFormContext();

  const {
    formState: { errors },
    setValue,
    setError,
    getValues,
    clearErrors,
    register,
  } = formContext;

  const handleChange = (isValid: boolean, value: string) => {
    setValue(name, value);
    isValid === false && setError(name, { message: `Invalid ${label}` });
    !!isValid && clearErrors(name);
  };

  return (
    <div {...rest}>
      <label htmlFor={name} className='block text-black'>
        {label}
      </label>
      <div className='mt-1 relative rounded-md'>
        <IntlTelInput
          defaultCountry='ph'
          defaultValue={getValues(name)}
          containerClassName='intl-tel-input w-full'
          inputClassName={`focus:shadow-sm block w-full  border outline-none transition-all sm:text-sm rounded-md p-2 ${
            errors[name]
              ? 'border-rose-500 text-rose-600 placeholder-rose-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 pr-10'
              : 'focus:ring-primary focus:border-primary border-gray-300 pr-2'
          }
            ${leadingIcon ? 'pl-10' : prefix ? 'pl-16' : 'pl-2'}
            `}
          onPhoneNumberChange={handleChange}
          fieldName={register(name).name}
          ref={register(name).ref}
        />
        {errors[name] && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <ExclamationCircleIcon
              className='h-5 w-5 text-rose-500'
              aria-hidden='true'
            />
          </div>
        )}
      </div>

      {errors[name] && (
        <p className='mt-2 text-sm text-rose-600' id='email-error'>
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default TelInput;
