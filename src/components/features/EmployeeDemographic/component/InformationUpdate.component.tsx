import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import { Form } from '../../../shared/Form';
import Input from '../../../shared/Input';
import TelInput from '../../../shared/TelInput';
import { InformationUpdateFormSchema } from '../form-resolver/demographicForm.resolver';
import { InformationUpdateFormType } from '../form-resolver/demographicForm.types';
import Select from '../../../shared/Select';
import { useDemographicStore } from '../../../../store/Demographic.store';
import FormStepWrapper from './FormStepWrapper.component';
import FormStepButtons from './FormStepButtons.component';

const InformationUpdateForm: React.FC = () => {
  const [setDemographicDetails, demographicDetails] = useDemographicStore(
    (state) => [state.setDemographicDetails, state.demographicDetails]
  );

  const useFormReturn = useForm<InformationUpdateFormType>({
    mode: 'onChange',
    resolver: yupResolver(InformationUpdateFormSchema),
    defaultValues: {
      updatePermanentAddress: demographicDetails?.updatePermanentAddress,
      updateCurrentAddress: demographicDetails?.updateCurrentAddress,
      workEmail: demographicDetails?.workEmail,
      mobileNumber: demographicDetails?.mobileNumber,
      cA_City: demographicDetails?.cA_City,
      cA_Country: demographicDetails?.cA_Country,
      cA_Line1: demographicDetails?.cA_Line1,
      cA_State: demographicDetails?.cA_State,
      cA_ZipCode: demographicDetails?.cA_ZipCode,
      permanent_City: demographicDetails?.permanent_City,
      permanent_Country: demographicDetails?.permanent_Country,
      permanent_Line1: demographicDetails?.permanent_Line1,
      permanent_State: demographicDetails?.permanent_State,
      permanent_ZipCode: demographicDetails?.permanent_ZipCode,
    },
  });

  const {
    formState: { isValid },

    handleSubmit,
    getValues,
  } = useFormReturn;

  const onSubmit = (e: InformationUpdateFormType) => {
    setDemographicDetails(e);
  };

  return (
    <FormStepWrapper>
      <div className='mb-10'>
        <p className='text-lg font-barlow font-bold'>Information Update</p>
        <p className='text-sm text-gray-600'>
          Based on your Sprout profile, does any of these information needs
          updating?
        </p>
      </div>

      <Form useFormReturn={useFormReturn} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-2'>
            <Input
              label='Work Email'
              name='workEmail'
              className='w-full sm:w-1/2'
            />
            <TelInput
              label='Mobile Number'
              name='mobileNumber'
              className='w-full sm:w-1/2'
            />
          </div>

          <div className='flex flex-col'>
            <Select
              options={[
                { name: 'No', value: false },
                { name: 'Yes', value: true },
              ]}
              label='Permanent Address'
              name='updatePermanentAddress'
            />

            <AnimatePresence>
              {getValues('updatePermanentAddress') && (
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
                  className='mt-4'
                >
                  <div className='flex flex-col gap-4 p-5 border rounded-md'>
                    <Input
                      label='Permanent Address line 1'
                      name='permanent_Line1'
                    />
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-2'>
                      <Input
                        label='Permanent City'
                        name='permanent_City'
                        className='w-full sm:w-1/2'
                      />
                      <Input
                        label='Permanent State'
                        name='permanent_State'
                        className='w-full sm:w-1/2'
                      />
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-2'>
                      <Input
                        label='Permanent Country'
                        name='permanent_Country'
                        className='w-full sm:w-1/2'
                      />
                      <Input
                        label='Permanent Zip code'
                        name='permanent_ZipCode'
                        className='w-full sm:w-1/2'
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className='mt-4'>
              <Select
                options={[
                  { name: 'No', value: false },
                  { name: 'Yes', value: true },
                ]}
                label='Current Address'
                name='updateCurrentAddress'
              />

              <AnimatePresence>
                {getValues('updateCurrentAddress') && (
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
                    className='mt-4'
                  >
                    <div className='flex flex-col gap-4 p-5 border rounded-md'>
                      <Input label='Current Address line 1' name='cA_Line1' />
                      <div className='flex flex-col sm:flex-row gap-4 sm:gap-2'>
                        <Input
                          label='Current City'
                          name='cA_City'
                          className='w-full sm:w-1/2'
                        />
                        <Input
                          label='Current State'
                          name='cA_State'
                          className='w-full sm:w-1/2'
                        />
                      </div>
                      <div className='flex flex-col sm:flex-row gap-4 sm:gap-2'>
                        <Input
                          label='Current Country'
                          name='cA_Country'
                          className='w-full sm:w-1/2'
                        />
                        <Input
                          label='Current Zip code'
                          name='cA_ZipCode'
                          className='w-full sm:w-1/2'
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <FormStepButtons nextButtonType='submit' canGoToNextStep={isValid} />
      </Form>
    </FormStepWrapper>
  );
};

export default InformationUpdateForm;
