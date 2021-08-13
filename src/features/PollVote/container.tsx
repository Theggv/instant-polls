import React, { useEffect, useRef, useState } from 'react';

import { CheckboxOption } from '../../common/components/CheckboxOption';
import { PollContainer } from '../../common/containers/PollContainer';
import { useBooleanInput } from '../../common/hooks/useBooleanInput';
import { useTextInput } from '../../common/hooks/useTextInput';
import { ButtonInput } from '../../common/UI/input/ButtonInput';
import { TextInput } from '../../common/UI/input/TextInput';
import { StyledLabel } from '../../common/UI/label/StyledLabel';
import { StyledOption } from '../../common/UI/select/StyledOption';
import { StyledSelect } from '../../common/UI/select/StyledSelect';
import classes from './container.module.css';

import { ReCAPTCHA } from 'react-google-recaptcha';
import { useCaptcha } from '../../common/hooks/useCaptcha';

type DuplicateCheckTypes = 'none' | 'ip' | 'cookies';

interface Draft {
  title?: string;
  options?: string[];
  multiple?: boolean;
  captcha?: boolean;
  checkDuplicates?: DuplicateCheckTypes;
}

export const PollVote: React.FC<Draft> = ({
  title = '?',
  options = ['1', '2', '3', '4', '5'],
  multiple = false,
  captcha: enableCaptcha = true,
}) => {
  const allowMultipleInput = useBooleanInput(multiple);
  const [selected, setSelected] = useState<boolean[]>(
    Array(options.length).fill(false)
  );
  const captcha = useCaptcha(enableCaptcha);

  const onChange = (isChecked: boolean, index: number) => {
    if (multiple) {
      setSelected(
        selected.map((value, i) => (i === index ? isChecked : value))
      );
    } else {
      setSelected(selected.map((_, i) => (i === index ? isChecked : false)));
    }
  };

  // Debug token
  useEffect(() => {
    console.log('token', captcha.token);
  }, [captcha.token]);

  return (
    <PollContainer>
      <StyledLabel>{title}</StyledLabel>

      <div className={classes.options}>
        {options.map((option, index) => (
          <CheckboxOption
            key={index}
            checked={selected[index]}
            text={option}
            onChange={(e) => onChange(e.target.checked, index)}
          />
        ))}
      </div>
      {enableCaptcha && (
        <ReCAPTCHA
          sitekey='6LfrqfobAAAAAIgqP9z4s2oKRdEHwx4xDQgRjj54'
          {...captcha.bind}
        />
      )}

      <div className={classes.submit}>
        <ButtonInput className={classes.button} value='Vote' />
        <ButtonInput className={classes.button} value='Results' />
      </div>
    </PollContainer>
  );
};
