import React, { useState } from 'react';

export const useTextInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    setValue,

    bind: {
      value,
      onChange,
    },
    clear: () => {
      setValue('');
    },
  };
};
