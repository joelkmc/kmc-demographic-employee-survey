import { motion } from 'framer-motion';
import React from 'react';
import VerifyEmployeeFeature from '../components/features/VerifyEmployee/VerifyEmployee.feature';

const VerifyEmployeePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <VerifyEmployeeFeature />
    </motion.div>
  );
};

export default VerifyEmployeePage;
