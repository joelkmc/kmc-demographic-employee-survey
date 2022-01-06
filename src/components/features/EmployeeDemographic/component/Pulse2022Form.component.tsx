import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
  usePostEmployeeDemographic,
  useUploadFile,
} from '../../../../services/verify_employee/auth.hooks';
import { useDemographicStore } from '../../../../store/Demographic.store';
import Button from '../../../shared/Button';
import { useFormStepContext } from '../context/FormStepContext';
import { Pulse2022Enum } from '../form-resolver/demographicForm.types';
import FormStepWrapper from './FormStepWrapper.component';

export const pulseOptions = () => {
  const array: any[] = [];

  Object.values(Pulse2022Enum).forEach((option) => {
    array.push({
      id: option,
      title: option,
    });
  });

  return array;
};

const Pulse2022FormComponent = () => {
  const [pulse, setPulse] = useState<null | string>(null);
  const { handleBack, handleNext } = useFormStepContext();

  const demographicDetails = useDemographicStore(
    (state) => state.demographicDetails
  );

  const handleChange = (value: Pulse2022Enum) => {
    setPulse((old) => {
      return old ? [...old.split(';'), value].join(';') : value;
    });
  };

  console.log(pulse);

  const { mutateAsync, isLoading } = usePostEmployeeDemographic({
    onSuccess: () => {
      handleNext && handleNext();
    },
  });
  const { mutateAsync: uploadFile, isLoading: isUploading } = useUploadFile({
    onSuccess: async (e) => {
      demographicDetails &&
        (await mutateAsync({
          ...demographicDetails,
          employeeId: demographicDetails?.employeeId,
          nbiClearanceFilePath: e,
          pulseFor2022: pulse || '',
        }));

      handleNext && handleNext();
    },
  });

  const onNext = async () => {
    if (demographicDetails?.nbiClearanceFilePath) {
      const formData = new FormData();
      formData.append('files', demographicDetails?.nbiClearanceFilePath);
      uploadFile(formData);
    } else {
      await mutateAsync({
        ...demographicDetails,
        employeeId: demographicDetails?.employeeId,
        nbiClearanceSubmissionDate: dayjs(
          demographicDetails?.nbiClearanceSubmissionDate
        ).format('MMM-DD-YYYY'),
        pulseFor2022: pulse || '',
      });
    }
  };

  return (
    <FormStepWrapper>
      <p className='text-xl font-barlow font-bold text-primary text-center'>
        2022 Pulse!
      </p>
      <p className='font-barlow font-semibold text-black text-center'>
        Start the new year with a bang! We want to know how you feel going into
        2022!
      </p>

      <div className='mt-10'>
        <label className='font-medium font-barlow'>Select all that apply</label>
        <div className='mt-4'>
          <legend className='sr-only'>Pulse 2022</legend>
          <div className='space-y-2'>
            {pulseOptions().map((option) => (
              <div key={option.id} className='flex items-center'>
                <input
                  id={option.id}
                  name={option.id}
                  type='radio'
                  className='focus:ring-primary focus:ring-opacity-90 h-4 w-4 text-primary border-gray-300'
                  onChange={() => handleChange(option.id)}
                />
                <label
                  htmlFor={option.id}
                  className='ml-3 block text-sm font-medium text-gray-700'
                >
                  {option.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex w-full justify-between mt-10'>
        <Button
          onClick={handleBack}
          buttonType='dark'
          disabled={isUploading || isLoading}
        >
          Back
        </Button>
        <Button onClick={onNext} isLoading={isUploading || isLoading}>
          Next
        </Button>
      </div>
    </FormStepWrapper>
  );
};

export default Pulse2022FormComponent;
