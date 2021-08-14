import clsx from 'clsx';
import React from 'react';

import classes from './Header.module.css';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ children, className }) => {
  return (
    <header className={clsx(classes.header, className)}>{children}</header>
  );
};
