import clsx from 'clsx';
import React from 'react';

import classes from './container.module.css';

export const container: React.FC<React.ComponentPropsWithoutRef<'option'>> = (
  props
) => {
  return (
    <option {...props} className={clsx(classes.option, props.className)} />
  );
};
