import clsx from 'clsx';
import React from 'react';

import classes from './container.module.css';

interface Props {
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <footer className={clsx(classes.footer, className)}>
      <div className={classes.wrapper}>{children}</div>
    </footer>
  );
};
