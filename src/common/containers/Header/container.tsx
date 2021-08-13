import clsx from 'clsx';
import React from 'react';

import classes from './container.module.css';

interface Props {
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <header className={clsx(classes.header, className)}>{children}</header>
  );
};
