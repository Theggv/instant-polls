import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../common/model/firebase';
import { PollDraft } from '../../../common/model/pollDraft';

export interface CreatePollResponse {
  id: string;
  error?: string;
}

export interface GetPollResponse extends CreatePollResponse {
  draft: PollDraft;
  results: number[];
  ips: string[];
}

export const createPoll = async (draft: PollDraft): Promise<string | null> => {
  const poll = {
    draft,
    results: Array(draft.options.length).fill(0),
    ips: [],
  };

  const ref = await db.ref('/polls').push(poll);

  return ref.key;
};

export const getPoll = async (id: string): Promise<GetPollResponse | null> => {
  return await db
    .ref(`/polls/${id}`)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists()) return null;

      return { id, ...snapshot.val() };
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    /**
     * draft body param required
     */
    if (!req.body.draft) {
      res.status(400).json({ error: 'draft body param required' });
      return;
    }

    const key = await createPoll(req.body.draft);

    if (!key) res.json(500);
    else res.status(200).json({ id: key });
  }
};
