import clsx from 'clsx';
import React from 'react';

import classes from './ButtonInput.module.css';

export const ButtonInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  return (
    <input
      ref={ref}
      type='button'
      {...props}
      className={clsx(classes.input, props.className)}
    />
  );
});
