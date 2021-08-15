import { useEffect, useState } from 'react';

export const useModal = (timeout: number) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (!state) return;
    setTimeout(() => {
      setState(false);
    }, timeout);
  }, [state, timeout]);

  return {
    state,
    open: () => setState(true),
    close: () => setState(false),
  };
};
