import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import { CheckboxOption } from '../../common/components/CheckboxOption';
import { PollContainer } from '../../common/containers/PollContainer';
import { useBooleanInput } from '../../common/hooks/useBooleanInput';
import { useTextInput } from '../../common/hooks/useTextInput';
import { PollDraft } from '../../common/model/pollDraft';
import { ButtonInput } from '../../common/ui/input/ButtonInput';
import { TextInput } from '../../common/ui/input/TextInput';
import { StyledOption } from '../../common/ui/select/StyledOption';
import { StyledSelect } from '../../common/ui/select/StyledSelect';
import classes from './container.module.css';

const usePollForm = (draft: PollDraft) => {
  const titleInput = useTextInput(draft.title);
  const [options, setOptions] = useState<string[]>([...draft.options]);
  const allowMultipleInput = useBooleanInput(draft.multiple);
  const captchaInput = useBooleanInput(draft.useCaptcha);
  const duplicatesInput = useTextInput(draft.checkDuplicates);

  const nonEmptyOptions = useMemo(() => options.filter((x) => x), [options]);

  // Change value for specific option
  const onOptionChange = (value: string, index: number) => {
    setOptions(options.map((oldValue, i) => (i === index ? value : oldValue)));
  };

  const onCreatePoll = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    if (!titleInput.value || !nonEmptyOptions.length) return;

    /**
     * Create poll logic
     */

    // redirect TODO: replace 1 with actual id
    // history.push('/1');
  };

  useEffect(() => {
    // Add new option on change last option
    if (options.length < 3 || options[options.length - 1] !== '')
      setOptions([...options, '']);

    // Remove unused options [. text . .] -> [. text .]
    if (
      options.length > 3 &&
      options[options.length - 1] === '' &&
      options[options.length - 2] === ''
    )
      setOptions(options.filter((_, i) => i !== options.length - 1));
  }, [options]);

  return {
    title: titleInput.bind,
    multiple: allowMultipleInput.bind,
    useCaptcha: captchaInput.bind,
    checkDuplicates: {
      value: duplicatesInput.value,
      onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        duplicatesInput.setValue(e.target.value);
      },
    },

    options,
    setOptions,

    onOptionChange,
    onCreatePoll,

    draft: {
      title: titleInput.value,
      options: nonEmptyOptions,
      checkDuplicates: duplicatesInput.value,
      multiple: allowMultipleInput.value,
      useCaptcha: captchaInput.value,
    } as PollDraft,

    asSearchParam() {
      return JSON.stringify({
        ...this.draft,
        title: encodeURIComponent(titleInput.value),
        options: nonEmptyOptions.map(encodeURIComponent),
      });
    },
  };
};

export const defaultDraft = {
  title: '',
  options: [],
  multiple: false,
  useCaptcha: false,
  checkDuplicates: 'cookies',
} as PollDraft;

interface PollCreateFormProps {
  draft?: PollDraft;
}

export const PollCreateForm: React.FC<PollCreateFormProps> = ({
  draft = defaultDraft,
}) => {
  const form = usePollForm(draft);

  return (
    <PollContainer type='form'>
      <TextInput
        required
        className={classes.title}
        placeholder='Type your question'
        {...form.title}
      />

      <div className={classes.options}>
        {form.options.map((option, index) => (
          <TextInput
            key={index}
            onChange={(e) => form.onOptionChange(e.target.value, index)}
            value={option}
            placeholder='Type option'
          />
        ))}
      </div>

      <div className={classes.settings}>
        <StyledSelect {...form.checkDuplicates}>
          <StyledOption value='ip'>IP Duplication Checking</StyledOption>
          <StyledOption value='cookies'>
            Browser Cookie Duplication Checking
          </StyledOption>
          <StyledOption value='none'>No Duplication Checking</StyledOption>
        </StyledSelect>
        <CheckboxOption {...form.useCaptcha} text='Use captcha?' />
        <CheckboxOption {...form.multiple} text='Allow multiple choices?' />
      </div>

      <div className={classes.submit}>
        <ButtonInput
          type='submit'
          className={classes.btn__submit}
          value='Create poll'
          onClick={form.onCreatePoll}
        />
        <Link
          href={{
            pathname: '',
            search: `draft=${form.asSearchParam()}`,
          }}
        >
          <ButtonInput value='Save as draft' />
        </Link>
      </div>
    </PollContainer>
  );
};
