import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { CheckboxOption } from '../../common/components/CheckboxOption';
import { PollContainer } from '../../common/containers/PollContainer';
import { useBooleanInput } from '../../common/hooks/useBooleanInput';
import { useQuery } from '../../common/hooks/useQuery';
import { useTextInput } from '../../common/hooks/useTextInput';
import { ButtonInput } from '../../common/UI/input/ButtonInput';
import { TextInput } from '../../common/UI/input/TextInput';
import { StyledOption } from '../../common/UI/select/StyledOption';
import { StyledSelect } from '../../common/UI/select/StyledSelect';
import classes from './container.module.css';

type DuplicateCheckTypes = 'none' | 'ip' | 'cookies';
type Draft = {
  title: string;
  options: string[];
  multiple: boolean;
  captcha: boolean;
  checkDuplicates: DuplicateCheckTypes;
};

export const defaultDraft = {
  title: '',
  options: [],
  multiple: false,
  captcha: false,
  checkDuplicates: 'cookies',
} as Draft;

export const PollCreateForm: React.FC = () => {
  const history = useHistory();

  const query = useQuery();
  const draft = query.get('draft')
    ? (JSON.parse(query.get('draft')!) as Draft)
    : defaultDraft;

  const titleInput = useTextInput(draft.title);
  const [options, setOptions] = useState<string[]>([...draft.options]);
  const allowMultipleInput = useBooleanInput(draft.multiple);
  const captchaInput = useBooleanInput(draft.captcha);
  const duplicatesInput = useTextInput(draft.checkDuplicates);

  // Change value for specific option
  const onChange = (value: string, index: number) => {
    setOptions(options.map((oldValue, i) => (i === index ? value : oldValue)));
  };

  const getDraft = (): Draft => ({
    title: titleInput.value,
    options: options.filter((x) => x !== ''),
    multiple: allowMultipleInput.value,
    captcha: captchaInput.value,
    checkDuplicates: duplicatesInput.value as any,
  });

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

  const onCreatePoll = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    const draft = getDraft();

    if (!draft.title || !draft.options.length) return;

    /**
     * Create poll logic
     */

    // redirect TODO: replace 1 with actual id
    history.push('/1');
  };

  return (
    <PollContainer type='form'>
      <TextInput
        required
        className={classes.title}
        placeholder='Type your question'
        {...titleInput.bind}
      />

      <div className={classes.options}>
        {options.map((option, index) => (
          <TextInput
            key={index}
            onChange={(e) => onChange(e.target.value, index)}
            value={option}
            placeholder='Type option'
          />
        ))}
      </div>

      <div className={classes.settings}>
        <StyledSelect
          value={duplicatesInput.value}
          onChange={(e) => {
            duplicatesInput.setValue(e.target.value);
          }}
        >
          <StyledOption value='ip'>IP Duplication Checking</StyledOption>
          <StyledOption value='cookies'>
            Browser Cookie Duplication Checking
          </StyledOption>
          <StyledOption value='none'>No Duplication Checking</StyledOption>
        </StyledSelect>
        <CheckboxOption {...captchaInput.bind} text='Use captcha?' />
        <CheckboxOption
          {...allowMultipleInput.bind}
          text='Allow multiple choices?'
        />
      </div>

      <div className={classes.submit}>
        <ButtonInput
          type='submit'
          className={classes.btn__submit}
          value='Create poll'
          onClick={onCreatePoll}
        />
        <Link
          to={{
            pathname: '',
            search: `draft=${JSON.stringify({
              title: encodeURIComponent(titleInput.value),
              options: options.filter((x) => x !== '').map(encodeURIComponent),
              multiple: allowMultipleInput.value,
              captcha: captchaInput.value,
              checkDuplicates: duplicatesInput.value,
            })}`,
          }}
        >
          <ButtonInput value='Save as draft' />
        </Link>
      </div>
    </PollContainer>
  );
};
