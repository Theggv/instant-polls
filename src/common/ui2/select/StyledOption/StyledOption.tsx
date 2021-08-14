import clsx from 'clsx';
import React from 'react';

import classes from './StyledOption.module.css';

export const StyledOption: React.FC<React.ComponentPropsWithoutRef<'option'>> =
  (props) => {
    return (
      <option {...props} className={clsx(classes.option, props.className)} />
    );
  };
