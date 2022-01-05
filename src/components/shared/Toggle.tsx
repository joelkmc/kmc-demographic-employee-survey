import { Switch } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';

interface ToggleProps {
  label: string;
  name: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ label, name, className }) => {
  const { setValue, watch } = useFormContext();

  const onChange = (e: boolean) => {
    setValue(name, e);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <p className='block font-semibold text-black mr-2'>{label}</p>
      <Switch
        checked={watch(name)}
        onChange={onChange}
        className={`${
          watch(name) ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-all`}
      >
        <span className='sr-only'>{label}</span>
        <span
          className={`${
            watch(name) ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-all`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
