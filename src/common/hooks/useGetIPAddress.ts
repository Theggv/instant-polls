import axios from 'axios';
import { useEffect, useState } from 'react';

export const useGetIPAddress = (enabled: boolean) => {
  const [ip, setIp] = useState('');

  const getIP = async () => {
    const resp = await axios.get(
      'https://cors-anywhere.herokuapp.com/http://api.ipify.org/'
    );
    if (!resp) return;

    setIp(resp.data);
    console.log(resp.data);
  };

  useEffect(() => {
    if (enabled) getIP();
  }, [enabled]);

  return {
    ip,
  };
};
