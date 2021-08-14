import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

import { CheckboxOption } from '../../common/components/CheckboxOption';
import { PollContainer } from '../../common/containers/PollContainer';
import { useCaptcha } from '../../common/hooks/useCaptcha';
import { PollDraft } from '../../common/model/pollDraft';
import { ButtonInput } from '../../common/ui2/input/ButtonInput';
import { StyledLabel } from '../../common/ui2/label/StyledLabel';
import { submitAnswer } from './api/submit';
import classes from './PollVote.module.css';

export type PollVoteProps = {
  id: string;
  draft: PollDraft;
};

export const PollVote: React.FC<PollVoteProps> = ({ id, draft }) => {
  const router = useRouter();

  const [selected, setSelected] = useState<boolean[]>(
    Array(draft.options.length).fill(false)
  );
  const captcha = useCaptcha(draft.useCaptcha);

  const onChange = (isChecked: boolean, index: number) => {
    if (draft.multiple) {
      setSelected(
        selected.map((value, i) => (i === index ? isChecked : value))
      );
    } else {
      setSelected(selected.map((_, i) => (i === index ? isChecked : false)));
    }
  };

  const onClickVote = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!selected.filter((x) => x).length) return;

    const data = await submitAnswer(id, selected);
    if (!data) return;

    if (data.canSubmit) router.push(`/polls/${id}/results`);
  };

  return (
    <PollContainer type='form'>
      <StyledLabel className={classes.title}>{draft.title}</StyledLabel>

      {draft.multiple ? (
        <div className={classes.multiple}>Select All that Apply</div>
      ) : null}

      <div className={classes.options}>
        {draft.options.map((option, index) => (
          <CheckboxOption
            key={index}
            checked={selected[index]}
            text={option}
            onChange={(e) => onChange(e.target.checked, index)}
            className={classes.options__item}
          />
        ))}
      </div>

      {draft.useCaptcha && (
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
        <Link href={`${id}/results  `}>
          <ButtonInput value='Results' />
        </Link>
      </div>
    </PollContainer>
  );
};
