import React from 'react';
import { useNavigate } from 'react-location';
import { useEmployeeStore } from '../../../store/Employee.store';
import { MdArrowBackIosNew } from 'react-icons/md';
import Confidentiality from './component/Confidentiality.component';
import InformationUpdate from './component/InformationUpdate.component';
import { AnimatePresence } from 'framer-motion';
import {
  FormStepContextProvider,
  useFormStepContext,
} from './context/FormStepContext';
import Pulse2022FormComponent from './component/Pulse2022Form.component';
import DemographicFormComponent from './component/DemographicForm.component';

interface Props {
  employeeID: string;
}

const EmployeeDemographicFeature: React.FC<Props> = ({ employeeID }) => {
  const navigate = useNavigate();

  const [email, lastName, firstName] = useEmployeeStore((state) => [
    state.emailUsedByUser,
    state.lastName,
    state.firstName,
  ]);

  return (
    <div>
      <div className='mb-4 text-sm'>
        <button className='text-sm mb-4' onClick={() => navigate({ to: '/' })}>
          <p className='flex items-center text-gray-700 hover:text-kmc-primary transition-all'>
            <MdArrowBackIosNew className='pr-1' />
            <span className='leading-3'>Back</span>
          </p>
        </button>
        <p className='font-proxiSemiBold text-kmc-primary'>
          {firstName} {lastName}
        </p>
        <p className='text-gray-500'>{email}</p>
        <p className='text-gray-500 sr-only'>{employeeID}</p>
      </div>
      <FormStepContextProvider formStepLength={4}>
        <AnimatedFormsContainer />
      </FormStepContextProvider>
    </div>
  );
};

export default EmployeeDemographicFeature;

const AnimatedFormsContainer = () => {
  const { activeStep } = useFormStepContext();

  return (
    <AnimatePresence exitBeforeEnter>
      {activeStep === 0 && <InformationUpdate key={0} />}
      {activeStep === 1 && <Confidentiality key={1} />}
      {activeStep === 2 && <DemographicFormComponent key={2} />}
      {activeStep === 3 && <Pulse2022FormComponent key={3} />}
    </AnimatePresence>
  );
};
