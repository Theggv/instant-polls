import clsx from 'clsx';
import React from 'react';

import classes from './container.module.css';

interface Props {
  className?: string;
}

export const MainContainer: React.FC<Props> = ({ children, className }) => {
  return <main className={clsx(classes.main, className)}>{children}</main>;
};
