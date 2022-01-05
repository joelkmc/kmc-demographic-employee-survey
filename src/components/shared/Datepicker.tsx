import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { useFormContext } from 'react-hook-form';
import { BsCalendar4Week } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { useIsCurrent } from '../../utils/useIsCurrent';

interface DatepickerProps {
  name: string;
  label: string;
  onChange?: (date: Date) => void;
  minDate?: Date;
  className?: string;
}

export const Datepicker: React.FC<DatepickerProps> = ({
  label,
  name,
  minDate,
  onChange,
  ...rest
}) => {
  const { isCurrent } = useIsCurrent();
  const [state, setstate] = useState<Date | null>(null);
  const isActive = useRef(false);

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const {
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();

  useEffect(() => {
    if (isActive.current) {
      setstate(getValues(name));
    }
  }, [isCurrent, name, getValues]);

  const handleChange = (e: Date) => {
    onChange && onChange(e);
    setstate(e);
    setValue(name, e);
  };

  return (
    <div {...rest}>
      <label htmlFor={name} className='block text-sm text-gray-600 mb-1'>
        {label}
      </label>
      <DatePicker
        className='w-full'
        onChange={handleChange}
        value={state}
        calendarIcon={<BsCalendar4Week className='text-gray-600' />}
        clearIcon={<GrClose className='text-gray-600' />}
        minDate={minDate}
      />

      {errors[name] && (
        <p className='mt-2 text-sm text-red-600' id='email-error'>
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
