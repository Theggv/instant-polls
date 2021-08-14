import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../common/model/firebase';
import {
  PollDraft,
  DuplicateCheckTypes,
} from '../../../common/model/pollDraft';

export type CreatePollResponse = {
  id: string;
};

const BASE_PATH = '/polls';

export const createPoll = async (draft: PollDraft) => {
  const ref = await db
    .ref(BASE_PATH)
    .push({ draft, results: draft.options.map((_) => 0) });

  return ref.key!;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CreatePollResponse>
) => {
  res.status(200).json({ id: await createPoll(req.body) });
};
