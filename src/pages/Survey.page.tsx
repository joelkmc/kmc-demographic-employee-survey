import { motion } from 'framer-motion';
import React from 'react';
import { Link, useMatch } from 'react-location';
import { ProtectedRouteLocationGenerics } from '../infrastructure/navigation/routes';

const SurveyPage: React.FC = () => {
  const { employeeID } = useMatch<ProtectedRouteLocationGenerics>().params;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        {employeeID}

        <Link to='/verify-employee'>home</Link>
      </div>
    </motion.div>
  );
};

export default SurveyPage;
