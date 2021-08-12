import './container.module.css';

import React from 'react';

export const container = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  return (
    <input ref={ref} type='text' placeholder='Placeholder...' {...props} />
  );
});
