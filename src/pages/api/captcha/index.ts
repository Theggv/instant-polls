import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export const validateCaptcha = async (token: string): Promise<boolean> => {
  const secret = process.env.RECAPTCHA_SERVER;

  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );

  return res && res.data.success;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const results = await validateCaptcha(req.body.token);

  if (!results) res.status(400);
  else res.status(200);
};
