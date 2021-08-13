import clsx from 'clsx';
import React from 'react';

import classes from './container.module.css';

interface Props {
  className?: string;
  type?: 'div' | 'form';
}

export const PollContainer: React.FC<Props> = ({
  children,
  type = 'div',
  className,
}) => {
  return React.createElement(
    type,
    { className: clsx(classes.container, className) },
    children
  );
};
