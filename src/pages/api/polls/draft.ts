import type { NextApiRequest, NextApiResponse } from 'next';
import { PollDraft } from '../../../common/model/pollDraft';
import { getPoll } from './';

const BASE_PATH = '/polls';

export type GetPollResponse = {
  draft?: PollDraft;
  error?: string;
};

export const getDraft = async (id: string): Promise<PollDraft | null> => {
  const poll = await getPoll(id);

  if (!poll) return null;

  return poll.draft;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetPollResponse>
) => {
  if (req.method == 'GET') {
    /**
     * id query param required
     */
    if (!req.query.id) {
      res.status(400).json({ error: 'id query param required' });
      return;
    }

    const draft = await getDraft(req.query.id as any);

    if (!draft) res.status(404).json({});
    else res.status(200).json({ draft });
  }
};
