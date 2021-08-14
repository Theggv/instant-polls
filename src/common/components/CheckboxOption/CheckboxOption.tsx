import clsx from 'clsx';
import React, { useRef } from 'react';

import { CheckboxInput } from '../../ui2/input/CheckboxInput';
import { StyledLabel } from '../../ui2/label/StyledLabel';
import classes from './CheckboxOption.module.css';

interface Props {
  text: string;
  checked: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxOption: React.FC<Props> = ({
  text,
  checked,
  onChange,
  className,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className={clsx(classes.container, className)}
      onClick={() => {
        ref.current && ref.current.click();
      }}
    >
      <CheckboxInput
        ref={ref}
        checked={checked}
        onChange={onChange}
        className={classes.checkbox}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <StyledLabel className={classes.label}>{text}</StyledLabel>
    </div>
  );
};
