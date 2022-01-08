import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import FormStepWrapper from './FormStepWrapper.component';
import { SocialIcon } from 'react-social-icons';

const SuccessComponent: React.FC = () => {
  return (
    <FormStepWrapper>
      <div className='p-5 rounded-lg max-w-sm mx-auto shadow-lg border-gray-100 border bg-gray-50'>
        <div className='flex flex-col items-center gap-4'>
          <FaCheckCircle className='text-6xl text-green-600' />
          <p className='font-proxiExtraBold text-2xl text-green-600'>SUCCESS</p>
          <div className='mt-2 text-gray-600 text-center'>
            <p>Thank you for answering our survey!</p>
          </div>
        </div>
      </div>

      <div className='mt-10 text-center font-semibold'>
        <p>
          Check out our{' '}
          <span className='text-primary'>
            <a
              target='_blank'
              href='https://www.jobstreet.com.ph/en/job-search/jobs-at-kmc-solutions/'
              rel='noreferrer'
            >
              job openings
            </a>{' '}
          </span>
          and get exciting referral fees!
        </p>

        <div className='flex items-center flex-col mt-10 font-normal'>
          <p className='text-sm text-gray-800'>Follow us on our socials!</p>
          <div className='flex gap-2 mt-2'>
            <SocialIcon
              target='_blank'
              url='https://www.facebook.com/kmcsolutionsph/'
              style={{ height: 35, width: 35 }}
            />
            <SocialIcon
              target='_blank'
              url='https://www.instagram.com/kmcsolutions/?hl=en'
              style={{ height: 35, width: 35 }}
            />
            <SocialIcon
              target='_blank'
              url='https://www.linkedin.com/company/kmc-solutions-inc'
              style={{ height: 35, width: 35 }}
            />
          </div>
        </div>
      </div>
    </FormStepWrapper>
  );
};

export default SuccessComponent;
