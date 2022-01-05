import { motion } from 'framer-motion';
import React from 'react';
import { Link, useMatch } from 'react-location';
import { LocationGenerics } from '../infrastructure/navigation/routes';

const SurveyPage: React.FC = () => {
  const {
    params: { employeeID },
    data,
  } = useMatch<LocationGenerics>();

  console.log(data);
  // const { status, data, error, isFetching } = usePost(postId);

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
