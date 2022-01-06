import React, { useState } from 'react';
import FormStepButtons from './FormStepButtons.component';
import FormStepWrapper from './FormStepWrapper.component';

enum AgreementOptionEnum {
  AGREE = 'agree',
  DONT_AGREE = 'dont-agree',
}

const options = [
  {
    id: AgreementOptionEnum.AGREE,
    title: 'I have read and agree to the Agreement, and I want to proceed.',
  },
  {
    id: AgreementOptionEnum.DONT_AGREE,
    title: 'I decline to participate in the survey',
  },
];
const Confidentiality: React.FC = () => {
  const [agreed, setAgreed] = useState<AgreementOptionEnum | null>(null);

  return (
    <FormStepWrapper>
      <div className='flex flex-col gap-3'>
        <p className='text-lg font-semibold font-barlow'>Demographic Study</p>
        <p className='text-sm'>
          Kindly spend a few minutes completing this survey. To preserve your
          anonymity, the People Experience Team created the survey in such a way
          that any information you enter will be protected.
        </p>
        <p className='text-lg font-semibold font-barlow'>
          Why Undertake this Survey?
        </p>
        <p className='italic font-light text-sm'>
          Equity, diversity and inclusion are core strategic priorities for KMC.
          Through the workplace Diversity and Inclusion Survey we genuinely want
          to better understand our workplace culture and whether it works well
          for everyone. Through the survey, we will have a more detailed
          understanding of our organization&apos;s demographics as well as
          employees perceptions of inclusivity; in turn, providing the
          organization with quantitative data not previously available on our
          workforce setup. This will help the KMC leaders identify gaps where
          under-representation of equity-seeking groups may exist, and develop
          strategies to address these gaps and barriers.
        </p>

        <div className='mt-5'>
          <label className='text-lg font-semibold font-barlow'>
            Confidentiality Agreement
          </label>
          <p className='font-medium text-sm'>
            The survey questions and responses are fully confidential between
            KMC and the respondent, and will not be shared with anyone else. Any
            disclosure made in violation of this section shall be considered as
            a breach of this Agreement.
          </p>
          <fieldset className='mt-4'>
            <legend className='sr-only'>Notification method</legend>
            <div className='space-y-2'>
              {options.map((option) => (
                <div key={option.id} className='flex items-center'>
                  <input
                    id={option.id}
                    name='notification-method'
                    type='radio'
                    className='focus:ring-primary focus:ring-opacity-90 h-4 w-4 text-primary border-gray-300'
                    onChange={() => setAgreed(option.id)}
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
          </fieldset>
        </div>
      </div>

      <FormStepButtons
        isNextButtonDisabled={!agreed}
        canGoToNextStep={!!agreed}
        jumpToStep={agreed === 'dont-agree' ? 4 : 0}
      />
    </FormStepWrapper>
  );
};

export default Confidentiality;
