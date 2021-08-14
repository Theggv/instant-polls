import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../common/model/firebase';
import { PollDraft } from '../../../common/model/pollDraft';

const BASE_PATH = '/polls';

export type GetPollResponse = {
  draft: PollDraft;
  results: number[];
};

export const getResults = async (
  id: string
): Promise<GetPollResponse | undefined> => {
  return await db
    .ref(`${BASE_PATH}/${id}`)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists()) return undefined;
      console.log(snapshot.val());

      return snapshot.val();
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetPollResponse>
) => {
  const results = await getResults(req.body);

  if (!results) res.status(404);
  else res.status(200).json(results);
};
