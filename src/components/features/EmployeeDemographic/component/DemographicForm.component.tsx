import React from 'react';
import FormStepButtons from './FormStepButtons.component';
import FormStepWrapper from './FormStepWrapper.component';

const DemographicFormComponent = () => {
  return (
    <FormStepWrapper>
      Demo Form
      <FormStepButtons canGoToNextStep={true} />
    </FormStepWrapper>
  );
};

export default DemographicFormComponent;
