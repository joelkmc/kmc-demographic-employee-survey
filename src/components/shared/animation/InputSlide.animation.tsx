import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  className?: string;
}

const InputSlideAnimation: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: 'auto',
      }}
      exit={{
        opacity: 0,
        height: 0,
        transition: {
          delay: 0.3,
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default InputSlideAnimation;
