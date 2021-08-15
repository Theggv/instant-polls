import type { NextApiRequest, NextApiResponse } from 'next';
import { PollDraft } from '../../../common/model/pollDraft';
import { getPoll } from './';

export type GetPollResponse = {
  poll?: {
    draft: PollDraft;
    results: number[];
  };
  error?: string;
};

export const getResults = async (
  id: string
): Promise<GetPollResponse | null> => {
  const poll = await getPoll(id);

  if (!poll) return null;

  return { poll: { draft: poll.draft, results: poll.results } };
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

    const poll = await getResults(req.body);

    if (!poll) res.status(404).json({});
    else res.status(200).json(poll);
  }
};
