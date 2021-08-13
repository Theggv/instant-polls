import React, { useEffect, useState } from 'react';

import { CheckboxOption } from '../../common/components/CheckboxOption';
import { PollContainer } from '../../common/containers/PollContainer';
import { useBooleanInput } from '../../common/hooks/useBooleanInput';
import { useTextInput } from '../../common/hooks/useTextInput';
import { ButtonInput } from '../../common/UI/input/ButtonInput';
import { TextInput } from '../../common/UI/input/TextInput';
import { StyledOption } from '../../common/UI/select/StyledOption';
import { StyledSelect } from '../../common/UI/select/StyledSelect';
import classes from './container.module.css';

type DuplicateCheckTypes = 'none' | 'ip' | 'cookies';

interface Draft {
  title?: string;
  options?: string[];
  multiple?: boolean;
  captcha?: boolean;
  checkDuplicates?: DuplicateCheckTypes;
}

export const PollCreateForm: React.FC<Draft> = ({
  title = '',
  options: draftOptions = [],
  multiple = false,
  captcha = false,
  checkDuplicates = 'cookies',
}) => {
  const titleInput = useTextInput(title);
  const [options, setOptions] = useState<string[]>([...draftOptions]);
  const allowMultipleInput = useBooleanInput(multiple);
  const captchaInput = useBooleanInput(captcha);
  const duplicatesInput = useTextInput(checkDuplicates);

  // Change value for specific option
  const onChange = (value: string, index: number) => {
    setOptions(options.map((oldValue, i) => (i === index ? value : oldValue)));
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

  return (
    <PollContainer type='form'>
      <TextInput
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
        <ButtonInput value='Create poll' />
        <ButtonInput value='Save as draft' />
      </div>
<<<<<<< HEAD
      <div className={classes.margins}></div>
    </form>
=======
    </PollContainer>
>>>>>>> 589a0d9e42b71f861b5c6602ff33e9374902b895
  );
};
