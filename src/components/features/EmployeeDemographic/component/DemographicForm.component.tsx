import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDemographicStore } from '../../../../store/Demographic.store';
import { Form } from '../../../shared/Form';
import Select from '../../../shared/Select';
import {
  addressCategoryOptions,
  ethnicOptions,
  highestDegreeOptions,
  indegenousTribeOptions,
  nationalityOptions,
  orgRoleOptions,
  racialEthnicGroupOptions,
  salaryRangeOptions,
  sexualOrientationOptions,
  yrsWithKmcOptions,
} from '../form-resolver/demographicForm.helper';
import { DemographicFormSchema } from '../form-resolver/demographicForm.resolver';
import { DemographicFormType } from '../form-resolver/demographicForm.types';
import FormStepButtons from './FormStepButtons.component';
import FormStepWrapper from './FormStepWrapper.component';

const DemographicFormComponent = () => {
  const [demographicDetails, setDemographicDetails] = useDemographicStore(
    (state) => [state.demographicDetails, state.setDemographicDetails]
  );

  const useFormReturn = useForm<DemographicFormType>({
    mode: 'onChange',
    resolver: yupResolver(DemographicFormSchema),
    defaultValues: {
      yearsWithKMC: demographicDetails?.yearsWithKMC,
      sexualOrientation: demographicDetails?.sexualOrientation,
      organizationalRole: demographicDetails?.organizationalRole,

      highestDegreeEarned: demographicDetails?.highestDegreeEarned,
      addressCategory: demographicDetails?.addressCategory,
      salaryRange: demographicDetails?.salaryRange,

      nationality: demographicDetails?.nationality,
      ethnicity: demographicDetails?.ethnicity,
      ethnicGroup: demographicDetails?.ethnicGroup,
      indigenousTribe: demographicDetails?.indigenousTribe,
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = useFormReturn;

  const onSubmit = (e: DemographicFormType) => {
    setDemographicDetails(e);
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
            name='sexualOrientation'
            label='Sexual Orientation'
            options={[
              { name: 'Select your answer', value: null },
              ...sexualOrientationOptions(),
            ]}
          />

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

        {/* nationality: demographicDetails?.nationality,
      ethnicity: demographicDetails?.ethnicity,
      ethnicGroup: demographicDetails?.ethnicGroup,
      partOfIndigenousTribes: demographicDetails?.partOfIndigenousTribes,
      indigenousTribe: demographicDetails?.indigenousTribe, */}

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
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                >
                  <Select
                    name='indigenousTribe'
                    label='What Indigenous tribe in the Philippines?'
                    options={[
                      { name: 'Select your answer', value: null },
                      ...indegenousTribeOptions(),
                    ]}
                  />
                </motion.div>
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
