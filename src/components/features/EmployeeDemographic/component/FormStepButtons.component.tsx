import React from 'react';
import Button from '../../../shared/Button';
import { useFormStepContext } from '../context/FormStepContext';

interface Props {
  onBack?: () => void;
  onNext?: () => void;
  isNextButtonDisabled?: boolean;
  backButtonType?: 'button' | 'submit';
  canGoToNextStep?: boolean;
  nextButtonType?: 'button' | 'submit';
  jumpToStep?: number;
}

const FormStepButtons: React.FC<Props> = ({
  onBack,
  onNext,
  canGoToNextStep,
  backButtonType = 'button',
  nextButtonType = 'button',
  isNextButtonDisabled,
  jumpToStep,
}) => {
  const { handleBack, handleNext, canGoBack, canGoNext } = useFormStepContext();

  const handleBackStep = () => {
    if (canGoBack) {
      onBack && onBack();
      handleBack && handleBack();
    }
  };
  const handleNextStep = () => {
    console.log(canGoNext && canGoToNextStep, { canGoNext, canGoToNextStep });
    if (canGoNext && canGoToNextStep) {
      onNext && onNext();
      handleNext && handleNext(jumpToStep);
    }
  };
  return (
    <div className='flex w-full justify-between mt-5'>
      <Button
        className={`${canGoBack ? 'opacity-100' : 'opacity-0'} transition-all `}
        onClick={handleBackStep}
        type={backButtonType}
        buttonType='dark'
      >
        Back
      </Button>
      <Button
        type={nextButtonType}
        onClick={handleNextStep}
        disabled={isNextButtonDisabled}
      >
        Next
      </Button>
    </div>
  );
};

export default FormStepButtons;
