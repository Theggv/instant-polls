import clsx from 'clsx';
import React from 'react';

import classes from './container.module.css';

export const container: React.FC<React.ComponentPropsWithoutRef<'select'>> = ({
  children,
  ...props
}) => {
  return (
    <select {...props} className={clsx(classes.select, props.className)}>
      {children}
    </select>
  );
};
