import './container.module.css';

import React from 'react';

export const container: React.FC<React.ComponentPropsWithoutRef<'select'>> = ({
  children,
  ...props
}) => {
  return <select {...props}>{children}</select>;
};
