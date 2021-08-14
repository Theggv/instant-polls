import clsx from 'clsx';
import React from 'react';

import classes from './Footer.module.css';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ children, className }) => {
  return (
    <footer className={clsx(classes.footer, className)}>
      <div className={classes.wrapper}>{children}</div>
    </footer>
  );
};
