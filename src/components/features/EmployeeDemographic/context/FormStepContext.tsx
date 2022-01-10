import { createContext, useContext, useState } from 'react';

export type FormStepActionType = 'next' | 'back';

type FormContextType = {
  action: FormStepActionType;
  activeStep: number;
  previousStep: number;
  canGoBack: boolean;
  canGoNext: boolean;
  handleNext?: (jumpTo?: number) => void;
  handleBack?: () => void;
};

export const FormStepContext = createContext<FormContextType>({
  activeStep: 0,
  previousStep: 0,
  action: 'next',
  canGoBack: true,
  canGoNext: true,
});

export const FormStepContextProvider: React.FC<{ formStepLength: number }> = ({
  children,
  formStepLength = 0,
}) => {
  const [action, setAction] = useState<FormStepActionType>('next');
  const [activeStep, setActiveStep] = useState(0);
  const [previousStep, setpreviousStep] = useState(0);

  const handleNext = (jumpTo?: number) => {
    setAction('next');

    setpreviousStep(
      (jumpTo || activeStep + 1) - (jumpTo ? jumpTo - activeStep : 1)
    );

    setActiveStep((old) => {
      return jumpTo || old + 1;
    });
  };

  const handleBack = () => {
    setAction('back');
    setActiveStep(() => {
      const old = previousStep;
      setpreviousStep(previousStep - 1);
      return old - 1;
    });
  };

  return (
    <FormStepContext.Provider
      value={{
        activeStep,
        handleNext,
        handleBack,
        previousStep,
        action,
        canGoBack: activeStep > 0,
        canGoNext: activeStep < formStepLength,
      }}
    >
      {children}
    </FormStepContext.Provider>
  );
};

export const useFormStepContext = () => useContext(FormStepContext);
