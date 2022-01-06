import { motion } from 'framer-motion';
import React from 'react';
import { useFormStepContext } from '../context/FormStepContext';

const FormStepWrapper: React.FC = ({ children }) => {
  const { action } = useFormStepContext();

  return (
    <motion.div
      initial={{ translateX: action === 'next' ? 50 : -50, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ duration: 0.3, type: 'tween' }}
      className='my-10'
    >
      <div className='max-w-2xl mx-auto'>{children}</div>
    </motion.div>
  );
};

export default FormStepWrapper;
