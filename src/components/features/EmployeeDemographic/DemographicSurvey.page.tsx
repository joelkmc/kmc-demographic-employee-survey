import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useMatch, useNavigate } from 'react-location';
import { LocationGenerics } from '../../../infrastructure/navigation/routes';
import { useDemographicStore } from '../../../store/Demographic.store';
import { useEmployeeStore } from '../../../store/Employee.store';
import Confidentiality from './component/Confidentiality.component';
import DemographicFormComponent from './component/DemographicForm.component';
import InformationUpdateForm from './component/InformationUpdate.component';
import NBIFileUploadComponent from './component/NBIFileUpload.component';
import Pulse2022FormComponent from './component/Pulse2022Form.component';
import SuccessComponent from './component/Success.component';
import {
  FormStepContextProvider,
  useFormStepContext,
} from './context/FormStepContext';

const SurveyPage: React.FC = () => {
  const {
    params: { employeeID },
    data,
  } = useMatch<LocationGenerics>();

  const [setDemographicDetails, demographicDetails] = useDemographicStore(
    (state) => [state.setDemographicDetails, state.demographicDetails]
  );

  const navigate = useNavigate();

  const [email, lastName, firstName] = useEmployeeStore((state) => [
    state.emailUsedByUser,
    state.lastName,
    state.firstName,
  ]);

  useEffect(() => {
    setDemographicDetails(data);
  }, [data, setDemographicDetails]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {demographicDetails?.workEmail && (
        <>
          <div className='mb-4 text-sm'>
            <button
              className='text-sm mb-4'
              onClick={() => navigate({ to: '/' })}
            >
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
          <FormStepContextProvider formStepLength={5}>
            <AnimatedFormsContainer />
          </FormStepContextProvider>
        </>
      )}
    </motion.div>
  );
};

export default SurveyPage;

const AnimatedFormsContainer = () => {
  const { activeStep } = useFormStepContext();

  return (
    <AnimatePresence exitBeforeEnter>
      {activeStep === 0 && <InformationUpdateForm key={0} />}
      {activeStep === 1 && <NBIFileUploadComponent key={1} />}
      {activeStep === 2 && <Confidentiality key={2} />}
      {activeStep === 3 && <DemographicFormComponent key={3} />}
      {activeStep === 4 && <Pulse2022FormComponent key={4} />}
      {activeStep === 5 && <SuccessComponent key={5} />}
    </AnimatePresence>
  );
};
