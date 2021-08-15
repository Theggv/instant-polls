export const useCookies = () => {
  const getCookie = (key: string) => {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = (key: string, value: string, options: any) => {
    options = {
      path: '/',
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(key) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) updatedCookie += '=' + optionValue;
    }

    document.cookie = updatedCookie;
  };

  return {
    getCookie,
    setCookie,
  };
};
