import React from 'react';
import FormStepButtons from './FormStepButtons.component';
import FormStepWrapper from './FormStepWrapper.component';

const Pulse2022FormComponent = () => {
  return (
    <FormStepWrapper>
      2022
      <FormStepButtons canGoToNextStep={true} />
    </FormStepWrapper>
  );
};

export default Pulse2022FormComponent;
