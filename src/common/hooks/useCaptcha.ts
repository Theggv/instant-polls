import { useEffect, useState } from 'react';

export const useCaptcha = (enable: boolean) => {
  const [grecaptcha, setGrecaptcha] = useState<any>();
  const [token, setToken] = useState<string | null>(null);

  const onChange = (str: string | null) => {
    setToken(str);
  };

  // Load grecaptcha
  useEffect(() => {
    if (!enable || (window as any).grecaptcha) return;

    (window as any).onRecaptchaLoad = () => {
      setGrecaptcha((window as any).grecaptcha);
    };

    const scriptTag = document.createElement('script');
    scriptTag.src = '//www.google.com/recaptcha/api.js?onload=onRecaptchaLoad';
    document.body.appendChild(scriptTag);
  }, [enable]);

  return {
    token,
    bind: {
      grecaptcha,
      onChange,
    },
  };
};
