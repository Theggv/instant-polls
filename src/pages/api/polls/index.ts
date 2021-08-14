import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../common/model/firebase';

const BASE_PATH = '/polls';

export type GetPollsResponse = {
  keys: string[];
};

export const getPolls = async (id: string) => {
  return await db
    .ref(BASE_PATH)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists()) return [];
      const keys: string[] = [];
      snapshot.forEach((snap) => {
        if (snap.key) keys.push(snap.key);
      });

      return keys;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetPollsResponse>
) => {
  const keys = await getPolls(req.body);

  res.status(200).json({ keys });
};
