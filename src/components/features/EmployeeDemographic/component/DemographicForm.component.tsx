import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { useDemographicStore } from '../../../../store/Demographic.store';
import { Form } from '../../../shared/Form';
import Select from '../../../shared/Select';
import {
  addressCategoryOptions,
  ethnicOptions,
  genderOptions,
  highestDegreeOptions,
  nationalityOptions,
  orgRoleOptions,
  racialEthnicGroupOptions,
  salaryRangeOptions,
  sexualOrientationOptions,
  yrsWithKmcOptions,
} from '../form-resolver/demographicForm.helper';
import { DemographicFormSchema } from '../form-resolver/demographicForm.resolver';
import {
  DemographicFormType,
  GenderEnum,
  IndegenousTribeEnum,
} from '../form-resolver/demographicForm.types';
import FormStepButtons from './FormStepButtons.component';
import FormStepWrapper from './FormStepWrapper.component';
import InputSlideAnimation from '../../../shared/animation/InputSlide.animation';

const DemographicFormComponent: React.FC = () => {
  const [demographicDetails, setDemographicDetails] = useDemographicStore(
    (state) => [state.demographicDetails, state.setDemographicDetails]
  );

  const [indigenousTribe, setIndigenousTribe] = useState({
    [IndegenousTribeEnum.AETAS_NEGRITOS]: false,
    [IndegenousTribeEnum.ATI_TUMANDOK]: false,
    [IndegenousTribeEnum.BADJOA]: false,
    [IndegenousTribeEnum.IGOROT]: false,
    [IndegenousTribeEnum.LUMAD]: false,
    [IndegenousTribeEnum.MANGYAN]: false,
    [IndegenousTribeEnum.PALAWAN_TRIBES]: false,
    [IndegenousTribeEnum.OTHERS]: false,
  });

  const useFormReturn = useForm<DemographicFormType>({
    mode: 'onChange',
    resolver: yupResolver(DemographicFormSchema),
    defaultValues: {
      yearsWithKMC: demographicDetails?.yearsWithKMC,
      sexualOrientation: demographicDetails?.sexualOrientation,
      organizationalRole: demographicDetails?.organizationalRole,
      gender: demographicDetails?.gender,

      highestDegreeEarned: demographicDetails?.highestDegreeEarned,
      addressCategory: demographicDetails?.addressCategory,
      salaryRange: demographicDetails?.salaryRange,

      nationality: demographicDetails?.nationality,
      ethnicity: demographicDetails?.ethnicity,
      ethnicGroup: demographicDetails?.ethnicGroup,
      partOfIndigenousTribes: !!demographicDetails?.indigenousTribe,
    },
  });

  useEffect(() => {
    if (demographicDetails?.indigenousTribe) {
      const arrayOfIndigenousFromStore =
        demographicDetails.indigenousTribe.split(';');

      setIndigenousTribe((old) => {
        const newVal = old;
        const keysArray = Object.keys(newVal);
        arrayOfIndigenousFromStore.forEach((tribe) => {
          if (keysArray.includes(tribe)) {
            newVal[tribe as IndegenousTribeEnum] = true;
          }
        });
        console.log(newVal);
        return newVal;
      });
    }
  }, [demographicDetails?.indigenousTribe]);

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = useFormReturn;

  const handleChange = (value: IndegenousTribeEnum) => {
    // const index = pulse.findIndex((item) => item === value);
    setIndigenousTribe((old) => {
      return {
        ...old,
        [value]: !old[value],
      };
    });
  };

  const concatIndigeousTribe = () => {
    const arr = [];

    for (const key in indigenousTribe) {
      if (indigenousTribe[key as IndegenousTribeEnum]) {
        arr.push(key);
      }
    }

    return arr.join(';');
  };

  const onSubmit = (e: DemographicFormType) => {
    setDemographicDetails({
      ...e,
      indigenousTribe: concatIndigeousTribe(),
    });
  };

  return (
    <FormStepWrapper>
      <Form onSubmit={handleSubmit(onSubmit)} useFormReturn={useFormReturn}>
        <p className='text-lg font-semibold'>General Profiling Questions</p>
        <div className='flex flex-col gap-4 mt-2'>
          <Select
            name='yearsWithKMC'
            label='How long have you worked with KMC?'
            options={[
              { name: 'Select your answer', value: null },
              ...yrsWithKmcOptions(),
            ]}
          />

          <Select
            name='gender'
            label='Gender'
            options={[
              { name: 'Select your answer', value: null },
              ...genderOptions(),
            ]}
          />

          <AnimatePresence>
            {watch('gender') === GenderEnum.OTHERS && (
              <InputSlideAnimation>
                <Select
                  name='sexualOrientation'
                  label='Sexual Orientation'
                  options={[
                    { name: 'Select your answer', value: null },
                    ...sexualOrientationOptions(),
                  ]}
                />
              </InputSlideAnimation>
            )}
          </AnimatePresence>

          <Select
            name='organizationalRole'
            label='Which of the following best describes your role in the organization?'
            options={[
              { name: 'Select your answer', value: null },
              ...orgRoleOptions(),
            ]}
          />
        </div>

        <div className='mt-8'>
          <p className='text-lg font-semibold'>Socio Demographic Questions</p>
          <div className='flex flex-col gap-4 mt-2'>
            <Select
              name='highestDegreeEarned'
              label='What is the highest degree you earned?'
              options={[
                { name: 'Select your answer', value: null },
                ...highestDegreeOptions(),
              ]}
            />

            <Select
              name='addressCategory'
              label='The home where you live is'
              options={[
                { name: 'Select your answer', value: null },
                ...addressCategoryOptions(),
              ]}
            />

            <Select
              name='salaryRange'
              label='How much do you earn, before taxes and other deductions per month? (Gross)'
              options={[
                { name: 'Select your answer', value: null },
                ...salaryRangeOptions(),
              ]}
            />
          </div>
        </div>

        <div className='mt-8'>
          <p className='text-lg font-semibold'>Demographic Questions</p>
          <div className='flex flex-col gap-4 mt-2'>
            <Select
              name='nationality'
              label='What is your nationality?'
              options={[
                { name: 'Select your answer', value: null },
                ...nationalityOptions(),
              ]}
            />

            <Select
              name='ethnicity'
              label='Racial Ethnicity Group'
              options={[
                { name: 'Select your answer', value: null },
                ...racialEthnicGroupOptions(),
              ]}
            />

            <Select
              name='ethnicGroup'
              label='Enthnic Group'
              options={[
                { name: 'Select your answer', value: null },
                ...ethnicOptions(),
              ]}
            />

            <Select
              name='partOfIndigenousTribes'
              label='Part of Indigenous tribes in the Philippines?'
              options={[
                { name: 'Select your answer', value: null },
                { name: 'Yes', value: true },
                { name: 'No', value: false },
              ]}
            />

            <AnimatePresence>
              {watch('partOfIndigenousTribes') && (
                <InputSlideAnimation>
                  <div className='mt-4'>
                    <label className='font-medium font-barlow'>
                      What Indigenous Tribe in the Philippines?
                    </label>
                    <div className='mt-4'>
                      <legend className='sr-only'>Pulse 2022</legend>
                      <div className='space-y-2'>
                        {Object.values(IndegenousTribeEnum).map((option) => {
                          return (
                            <div key={option} className='flex items-center'>
                              <input
                                id={option}
                                checked={
                                  indigenousTribe[option as IndegenousTribeEnum]
                                }
                                name={option}
                                type='radio'
                                readOnly
                                className='focus:ring-primary focus:ring-opacity-90 h-4 w-4 text-primary border-gray-300'
                                onClick={() =>
                                  handleChange(option as IndegenousTribeEnum)
                                }
                              />
                              <label
                                htmlFor={option}
                                className='ml-3 block text-sm font-medium text-gray-700'
                              >
                                {option}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </InputSlideAnimation>
              )}
            </AnimatePresence>
          </div>
        </div>
        <FormStepButtons canGoToNextStep={isValid} nextButtonType='submit' />
      </Form>
    </FormStepWrapper>
  );
};

export default DemographicFormComponent;
