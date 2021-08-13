import clsx from 'clsx';
import React from 'react';

import classes from './container.module.css';

export const container = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  return (
    <input
      ref={ref}
      type='checkbox'
      {...props}
      className={clsx(classes.input, props.className)}
    />
  );
});
