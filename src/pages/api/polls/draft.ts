import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../common/model/firebase';
import { PollDraft } from '../../../common/model/pollDraft';

const BASE_PATH = '/polls';

export type GetPollResponse = {
  draft: PollDraft;
};

export const getDraft = async (id: string): Promise<PollDraft | undefined> => {
  return await db
    .ref(`${BASE_PATH}/${id}/draft`)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists()) return undefined;

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
  const draft = await getDraft(req.body);

  if (!draft) res.status(404);
  else res.status(200).json({ draft });
};
