import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import classes from './container.module.css';

interface Props {
  className?: string;
  percent: number;
  vertical?: boolean;
}

export const Container: React.FC<Props> = ({
  percent,
  className,
  vertical = false,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(() => setValue(percent), 100);
  }, []);

  return (
    <div
      className={clsx(classes.bar, className)}
      style={
        vertical
          ? {
              height: `${value}%`,
              width: '100%',
            }
          : { width: `${value}%`, height: '100%' }
      }
    ></div>
  );
};
