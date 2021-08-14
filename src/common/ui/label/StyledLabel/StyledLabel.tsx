import classes from './StyledLabel.module.css';

import React from 'react';
import clsx from 'clsx';

export const StyledLabel: React.FC<React.ComponentPropsWithoutRef<'label'>> = ({
  children,
  ...props
}) => {
  return (
    <label
      {...props}
      className={clsx(classes.label, classes.noselect, props.className)}
    >
      {children}
    </label>
  );
};
