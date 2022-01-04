import { useEffect, useRef } from 'react';

export const useIsCurrent = () => {
  const isCurrent = useRef(false);

  useEffect(() => {
    isCurrent.current = true;

    return () => {
      isCurrent.current = false;
    };
  }, []);

  return { isCurrent: isCurrent.current };
};
