import clsx from 'clsx';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import classes from './ModalWindow.module.css';

interface ModalWindowProps {
  state: 'hide' | 'show';
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  state,
  children,
}) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (state === 'hide') return;
    setClicked(false);
  }, [state]);

  if (state === 'hide') return null;

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.flex__container,
          clicked && classes.no__display
        )}
        onClick={() => setClicked(true)}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};
