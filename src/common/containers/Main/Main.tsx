import clsx from 'clsx';
import React from 'react';

import classes from './Main.module.css';

interface Props {
  className?: string;
}

export const Main: React.FC<Props> = ({ children, className }) => {
  return <main className={clsx(classes.main, className)}>{children}</main>;
};
