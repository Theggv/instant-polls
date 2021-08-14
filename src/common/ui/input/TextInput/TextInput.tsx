import clsx from 'clsx';
import React from 'react';

import classes from './TextInput.module.css';

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  return (
    <input
      ref={ref}
      type='text'
      placeholder='Placeholder...'
      {...props}
      className={clsx(classes.input, props.className)}
    />
  );
});
