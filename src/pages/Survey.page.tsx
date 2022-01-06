import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useMatch } from 'react-location';
import EmployeeDemographicFeature from '../components/features/EmployeeDemographic/EmployeeDemographic.feature';
import { LocationGenerics } from '../infrastructure/navigation/routes';
import { useDemographicStore } from '../store/Demographic.store';

const SurveyPage: React.FC = () => {
  const {
    params: { employeeID },
    data,
  } = useMatch<LocationGenerics>();

  const [setDemographicDetails, demographicDetails] = useDemographicStore(
    (state) => [state.setDemographicDetails, state.demographicDetails]
  );

  console.log(data);

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
        <EmployeeDemographicFeature employeeID={employeeID} />
      )}
    </motion.div>
  );
};

export default SurveyPage;
