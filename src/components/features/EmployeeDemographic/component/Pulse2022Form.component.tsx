import React, { useState } from 'react';
import dayjs from 'dayjs';

import {
  usePostEmployeeDemographic,
  useUploadFile,
} from '../../../../services/verify_employee/auth.hooks';
import { useDemographicStore } from '../../../../store/Demographic.store';
import Button from '../../../shared/Button';
import { useFormStepContext } from '../context/FormStepContext';
import { Pulse2022Enum } from '../form-resolver/demographicForm.types';
import FormStepWrapper from './FormStepWrapper.component';

const Pulse2022FormComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isWithPulseError, setIsWithPulseError] = useState(false);
  const [pulse, setPulse] = useState({
    [Pulse2022Enum.READY_TO_OVER]: false,
    [Pulse2022Enum.FEELING_GREAT_WORRIED]: false,
    [Pulse2022Enum.GREAT_YEAR]: false,
    [Pulse2022Enum.START_JOB_NEW_COMPANY]: false,
    [Pulse2022Enum.CANT_WAIT_BACK_TO_OFFICE]: false,
    [Pulse2022Enum.DREADING_BACK_TO_OFFICE]: false,
    [Pulse2022Enum.WORRIED_OMICRON]: false,
  });

  const { handleBack, handleNext } = useFormStepContext();

  const demographicDetails = useDemographicStore(
    (state) => state.demographicDetails
  );

  const handleChange = (value: Pulse2022Enum) => {
    // const index = pulse.findIndex((item) => item === value);
    setIsWithPulseError(false);

    setPulse((old) => {
      return {
        ...old,
        [value]: !old[value],
      };
    });
  };

  const concatPulse = () => {
    const arr = [];

    for (const key in pulse) {
      if (pulse[key as Pulse2022Enum]) {
        arr.push(key);
      }
    }

    return arr.join(';');
  };

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
          pulseFor2022: concatPulse(),
        }));
    },
  });

  const onNext = async () => {
    if (!concatPulse()) {
      setIsWithPulseError(true);
      return;
    }

    if (demographicDetails?.nbiClearanceFilePath) {
      const formData = new FormData();
      formData.append('files', demographicDetails.nbiClearanceFilePath);
      await uploadFile(formData);
    } else {
      await mutateAsync({
        ...demographicDetails,
        employeeId: demographicDetails?.employeeId,
        nbiClearanceSubmissionDate: dayjs(
          demographicDetails?.nbiClearanceSubmissionDate
        ).format('YYYY-MM-DD'),
        nbiClearanceFilePath: '',
        pulseFor2022: concatPulse(),
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
        {isWithPulseError && (
          <p className='font-medium font-barlow text-xs text-rose-500'>
            Please select at least 1 answer!
          </p>
        )}
        <div className='mt-4'>
          <legend className='sr-only'>Pulse 2022</legend>
          <div className='space-y-2'>
            {Object.keys(pulse).map((option) => {
              return (
                <div key={option} className='flex items-center'>
                  <input
                    id={option}
                    checked={pulse[option as Pulse2022Enum]}
                    name={option}
                    type='radio'
                    readOnly
                    className={`${
                      isWithPulseError ? 'border-rose-500' : 'border-gray-300'
                    } focus:ring-opacity-90 h-4 w-4 text-primary focus:ring-primary `}
                    // onChange={() => handleChange(option as Pulse2022Enum)}
                    onClick={() => handleChange(option as Pulse2022Enum)}
                  />
                  <label
                    htmlFor={option}
                    className={`${
                      isWithPulseError ? 'text-rose-600' : 'text-gray-700'
                    } ml-3 block text-sm font-medium`}
                  >
                    {option}
                  </label>
                </div>
              );
            })}
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
