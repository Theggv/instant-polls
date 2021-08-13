import classes from './container.module.css';

import React from 'react';
import clsx from 'clsx';

export const container = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  return <input ref={ref} type='button' {...props} className={clsx(classes.input, props.className)}/>;
});
