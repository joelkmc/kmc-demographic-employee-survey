import React from 'react';
import { useFormContext } from 'react-hook-form';

interface checkboxProps {
  label: string;
  name: string;
  className: string;
}

const Checkbox: React.FC<checkboxProps> = ({ label = '', name, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <div className='relative flex items-start'>
        <div className='flex items-center h-5'>
          <input
            id={name}
            type='checkbox'
            className={`focus:ring-primary focus:ring-opacity-60 h-4 w-4 text-primary rounded ${
              errors[name] ? 'border-rose-600' : 'border-gray-300'
            }`}
            {...register(name)}
          />
        </div>
        <div className='ml-2 text-sm'>
          <label htmlFor='comments' className='text-gray-700'>
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
