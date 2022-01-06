import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import { useDemographicStore } from '../../../../store/Demographic.store';
import { Datepicker } from '../../../shared/Datepicker';
import { Form } from '../../../shared/Form';
import Select from '../../../shared/Select';
import { NBIClearanceFormType } from '../form-resolver/demographicForm.types';
import FormStepWrapper from './FormStepWrapper.component';
import { BsPaperclip } from 'react-icons/bs';
import { IoIosRemoveCircle } from 'react-icons/io';
import FormStepButtons from './FormStepButtons.component';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { NBIFormSchema } from '../form-resolver/demographicForm.resolver';

const NBIFileUploadComponent: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [demographicDetails, setDemographicDetails] = useDemographicStore(
    (state) => [state.demographicDetails, state.setDemographicDetails]
  );

  const useFormReturn = useForm<NBIClearanceFormType>({
    mode: 'onChange',
    defaultValues: {
      isNbiAlreadySubmitted: demographicDetails?.nbiClearanceSubmissionDate
        ? true
        : demographicDetails?.nbiClearanceFilePath
        ? false
        : undefined,
      nbiClearanceSubmissionDate:
        demographicDetails?.nbiClearanceSubmissionDate,
    },
    resolver: yupResolver(NBIFormSchema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length === 0) {
        setFiles([...files, ...acceptedFiles]);
      }
    },
    [files]
  );

  useEffect(() => {
    if (demographicDetails?.nbiClearanceFilePath) {
      setFiles([demographicDetails?.nbiClearanceFilePath as File]);
    }
  }, [demographicDetails?.nbiClearanceFilePath]);

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    accept: '.pdf, .doc',
    onDrop,
    multiple: true,
  });

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      if (inputRef.current?.files) {
        const dt = new DataTransfer();
        const files = Array.from(inputRef.current.files);

        // Add selected fiels to DataTransfer object
        for (const file of files) {
          file.name !== fileName && dt.items.add(file); // Add only file name not matched files
        }

        inputRef.current.files = dt.files; // Overwrite files
        setFiles(Array.from(dt.files)); // Set states to render file list
      }
    },
    [inputRef]
  );

  const {
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useFormReturn;

  console.log(getValues());

  const onSubmit = (e: NBIClearanceFormType) => {
    console.log(files[0]);

    setDemographicDetails({
      nbiClearanceSubmissionDate: getValues('isNbiAlreadySubmitted')
        ? e.nbiClearanceSubmissionDate
        : '',
      nbiClearanceFilePath: getValues('isNbiAlreadySubmitted') ? '' : files[0],
    });
  };

  return (
    <FormStepWrapper>
      <Form onSubmit={handleSubmit(onSubmit)} useFormReturn={useFormReturn}>
        <div className='flex flex-col gap-4'>
          <Select
            name='isNbiAlreadySubmitted'
            label='Have you submitted your NBI clearance?'
            options={[
              { name: 'Select your answer', value: null },
              { name: 'Yes', value: true },
              { name: 'No', value: false },
            ]}
          />

          <AnimatePresence exitBeforeEnter>
            {watch('isNbiAlreadySubmitted') && (
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
                <Datepicker
                  name='nbiClearanceSubmissionDate'
                  label='Date Submitted'
                />
              </motion.div>
            )}
            {watch('isNbiAlreadySubmitted') === false && (
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
                <p className='font-medium mb-2'>Upload your NBI Clearance</p>
                <div
                  {...getRootProps({
                    className:
                      'text-center py-8 border-2 border-kmc-gray-100 text-kmc-gray-200 rounded-md border-dashed',
                  })}
                >
                  <input {...getInputProps()} />
                  <p>
                    Drag &apos;n&apos; drop some files here, or click to select
                    files
                  </p>
                </div>
                {files.length > 0 && (
                  <div className='py-4 sm:py-5'>
                    <dt className='text-sm font-medium text-gray-500 mb-1'>
                      Attached Files
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0'>
                      <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                        {files.map((file) => (
                          <li
                            key={file.name}
                            className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                          >
                            <div className='w-0 flex-1 flex items-center'>
                              <BsPaperclip
                                className='flex-shrink-0 h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                              <span className='ml-2 flex-1 w-0 truncate'>
                                {file.name}
                              </span>
                            </div>
                            <button
                              className='ml-4 flex-shrink-0 p-1'
                              onClick={() => handleRemoveFile(file.name)}
                            >
                              <IoIosRemoveCircle className='text-kmc-red text-opacity-90' />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FormStepButtons
          nextButtonType='submit'
          canGoToNextStep={
            errors.isNbiAlreadySubmitted || errors.nbiClearanceSubmissionDate
              ? false
              : true
          }
        />
      </Form>
    </FormStepWrapper>
  );
};

export default NBIFileUploadComponent;
