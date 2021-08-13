import React, { useRef } from 'react';

import { CheckboxInput } from '../../UI/input/CheckboxInput';
import { StyledLabel } from '../../UI/label/StyledLabel';
import classes from './container.module.css';

interface Props {
  text: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Container: React.FC<Props> = ({ text, checked, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className={classes.container}
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
