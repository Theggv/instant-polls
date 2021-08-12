import './container.module.css';

import React from 'react';

export const container: React.FC<React.ComponentPropsWithoutRef<'option'>> = (
  props
) => {
  return <option {...props} />;
};
