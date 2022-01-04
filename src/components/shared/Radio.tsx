import React, { HTMLProps, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';

interface RadioProps extends HTMLProps<HTMLDivElement> {
  label: string;
  name: string;
  options: {
    name: string;
    value: boolean | string | number;
    description?: string;
  }[];
  onChange?: () => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Radio: React.FC<RadioProps> = ({
  name,
  label,
  onChange,
  options,
  ...rest
}) => {
  const [selected, setSelected] = useState<{
    name: string;
    value: boolean | string | number | null;
    description?: string;
  }>({
    name: '',
    value: null,
  });

  const {
    setValue,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext();

  useEffect(() => {
    const value = getValues(name);
    if (getValues(name) !== null && getValues(name) !== undefined) {
      setSelected(() => {
        return options.find((x) => x.value === value) || options[0];
      });
    }
  }, [name, options, getValues]);

  const handleChange = async (e: {
    name: string;
    value: boolean | null;
    description?: string;
  }) => {
    setSelected(e);
    setValue(name, e.value);
    await trigger(name);
    onChange && onChange();
  };

  return (
    <div {...rest}>
      <RadioGroup value={selected} onChange={handleChange}>
        <RadioGroup.Label className="block text-sm font-proxiSemiBold text-gray-600 mb-1">
          {label}
        </RadioGroup.Label>
        <div className="bg-white rounded-md -space-y-px">
          {options.map((option, optionIdx) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ checked }) =>
                classNames(
                  errors[name] ? 'border-red-500' : '',
                  optionIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  optionIdx === options.length - 1
                    ? 'rounded-bl-md rounded-br-md'
                    : '',
                  checked && !errors[name]
                    ? 'bg-kmc-primary bg-opacity-5 border-kmc-primary border-opacity-40 z-10'
                    : 'border-gray-200',
                  'relative border p-4 flex cursor-pointer outline-none focus:outline-none transition-all'
                )
              }
            >
              {({ active }) => {
                return (
                  <>
                    <span
                      className={classNames(
                        selected.value === option.value
                          ? 'bg-kmc-primary border-transparent'
                          : 'bg-white border-gray-300',
                        active
                          ? 'ring-2 ring-offset-2 ring-kmc-primary text-opacity-90'
                          : '',
                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center transition-all'
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <div className="ml-3 flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          selected.value === option.value
                            ? 'text-gray-900'
                            : 'text-gray-600',
                          'block text-sm font-proxiSemiBold transition-all'
                        )}
                      >
                        {option.name}
                      </RadioGroup.Label>
                      {option?.description && (
                        <RadioGroup.Description
                          as="span"
                          className={classNames(
                            selected.value === option.value
                              ? 'text-kmc-primary'
                              : 'text-gray-500',
                            'block text-sm transition-all'
                          )}
                        >
                          {option.description}
                        </RadioGroup.Description>
                      )}
                    </div>
                  </>
                );
              }}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {errors[name] && (
        <p className="mt-2 text-xs text-red-600" id="email-error">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
