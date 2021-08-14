import React, { useEffect, useRef, useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CheckboxOption } from '../../common/components/CheckboxOption';
import { PollContainer } from '../../common/containers/PollContainer';
import { useBooleanInput } from '../../common/hooks/useBooleanInput';
import { useCaptcha } from '../../common/hooks/useCaptcha';
import { ButtonInput } from '../../common/ui/input/ButtonInput';
import { StyledLabel } from '../../common/ui/label/StyledLabel';
import classes from './container.module.css';

type DuplicateCheckTypes = 'none' | 'ip' | 'cookies';

interface Draft {
  title?: string;
  options?: string[];
  multiple?: boolean;
  captcha?: boolean;
  checkDuplicates?: DuplicateCheckTypes;
}

export const PollVote: React.FC<Draft> = ({
  title = 'Question?',
  options = ['Answer #1', 'Answer #2', 'Answer #3'],
  multiple = false,
  captcha: enableCaptcha = true,
}) => {
  const allowMultipleInput = useBooleanInput(multiple);
  const [selected, setSelected] = useState<boolean[]>(
    Array(options.length).fill(false)
  );
  const captcha = useCaptcha(enableCaptcha);
  const router = useRouter();

  const onChange = (isChecked: boolean, index: number) => {
    if (multiple) {
      setSelected(
        selected.map((value, i) => (i === index ? isChecked : value))
      );
    } else {
      setSelected(selected.map((_, i) => (i === index ? isChecked : false)));
    }
  };

  const onClickVote = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    if (!selected.filter((x) => x).length) return;
  };

  return (
    <PollContainer type='form'>
      <StyledLabel className={classes.title}>{title}</StyledLabel>

      <div className={classes.options}>
        {options.map((option, index) => (
          <CheckboxOption
            key={index}
            checked={selected[index]}
            text={option}
            onChange={(e) => onChange(e.target.checked, index)}
            className={classes.options__item}
          />
        ))}
      </div>

      {enableCaptcha && (
        <div className={classes.captcha}>
          <ReCAPTCHA
            sitekey='6LfrqfobAAAAAIgqP9z4s2oKRdEHwx4xDQgRjj54'
            {...captcha.bind}
          />
        </div>
      )}

      <div className={classes.buttons}>
        <ButtonInput
          type='submit'
          className={classes.btn__vote}
          value='Vote'
          onClick={onClickVote}
        />
        <Link href={`/${router.route}/r`}>
          <ButtonInput value='Results' />
        </Link>
      </div>
    </PollContainer>
  );
};
