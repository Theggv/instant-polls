import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

import { CheckboxOption } from '../../common/components/CheckboxOption';
import { PollContainer } from '../../common/containers/PollContainer';
import { useCaptcha } from '../../common/hooks/useCaptcha';
import { useCookies } from '../../common/hooks/useCookies';
import { useGetIPAddress } from '../../common/hooks/useGetIPAddress';
import { PollDraft } from '../../common/model/pollDraft';
import { ButtonInput } from '../../common/ui/input/ButtonInput';
import { StyledLabel } from '../../common/ui/label/StyledLabel';
import { SubmitAnswerResponse } from '../../pages/api/vote';
import classes from './PollVote.module.css';

export type PollVoteProps = {
  id: string;
  draft: PollDraft;
};

const useSubmitAnswer = (id: string, draft: PollDraft) => {
  const router = useRouter();
  const cookies = useCookies();
  const { ip } = useGetIPAddress(draft.checkDuplicates === 'ip');

  const [voteClicked, setVoteClicked] = useState(false);

  const hasCookie = () => {
    if (draft.checkDuplicates !== 'cookies') return false;

    const value = cookies.getCookie('polls');
    if (!value) return false;

    const polls: string[] = JSON.parse(value) || [];

    if (polls.find((x) => x === id)) return true;

    return false;
  };

  const addCookie = () => {
    const polls: string[] = JSON.parse(cookies.getCookie('polls') || '[]');
    polls.push(id);

    cookies.setCookie('polls', JSON.stringify(polls), {
      secure: true,
      'max-age': '31536000',
    });
  };

  const onClick = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    answers: boolean[],
    token: string | null
  ) => {
    e.preventDefault();

    if (!answers.filter((x) => x).length || voteClicked) return;

    // Check cookies
    if (draft.checkDuplicates === 'cookies' && hasCookie()) return;

    setVoteClicked(true);

    let body: any = { id, answers };
    if (draft.checkDuplicates === 'ip') body.ip = ip;
    if (draft.useCaptcha) body.token = token;

    await axios
      .post<SubmitAnswerResponse>('/api/vote', body)
      .then((res) => {
        if (res.data.submitted) {
          if (draft.checkDuplicates === 'cookies') addCookie();
          router.push(`/polls/${id}/results`);
        } else setVoteClicked(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data.error);
        }
        setVoteClicked(false);
      });
  };

  return {
    onClick,
  };
};

const useCheckboxList = (draft: PollDraft) => {
  const [selected, setSelected] = useState<boolean[]>(
    Array(draft.options.length).fill(false)
  );

  const onChange = (isChecked: boolean, index: number) => {
    if (draft.multiple) {
      setSelected(
        selected.map((value, i) => (i === index ? isChecked : value))
      );
    } else {
      setSelected(selected.map((_, i) => (i === index ? isChecked : false)));
    }
  };

  return {
    selected,
    setSelected,
    onChange,
  };
};

export const PollVote: React.FC<PollVoteProps> = ({ id, draft }) => {
  const captcha = useCaptcha(draft.useCaptcha);
  const list = useCheckboxList(draft);
  const submit = useSubmitAnswer(id, draft);

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
            checked={list.selected[index]}
            text={option}
            onChange={(e) => list.onChange(e.target.checked, index)}
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
          onClick={(e) => submit.onClick(e, list.selected, captcha.token)}
        />
        <Link href={`/polls/${id}/results`} passHref>
          <ButtonInput value='Results' />
        </Link>
      </div>
    </PollContainer>
  );
};
