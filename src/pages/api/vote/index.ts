import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../common/model/firebase';
import { validateCaptcha } from '../captcha';
import { getPoll, GetPollResponse } from '../polls';

export type SubmitAnswerResponse = {
  submitted?: boolean;
  error?: string;
};

export const submitAnswer = async (
  poll: GetPollResponse,
  answers: boolean[],
  ip?: string
) => {
  const results = poll.results.map((val, i) => val + Number(answers[i]));
  if (poll.draft.checkDuplicates === 'ip') {
    poll.ips?.push(ip!);
    await db
      .ref(`/polls/${poll.id}`)
      .update({ results, ips: poll.ips || [ip] });
  } else await db.ref(`/polls/${poll.id}`).update({ results });
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SubmitAnswerResponse>
) => {
  if (req.method === 'POST') {
    if (!req.body.id) {
      res.status(400).json({ error: 'id body param required' });
      return;
    }

    if (!req.body.answers) {
      res.status(400).json({ error: 'answers body param required' });
      return;
    }

    const poll = await getPoll(req.body.id);

    if (!poll) {
      res.status(404).json({});
      return;
    }

    // Check ip address
    if (poll.draft.checkDuplicates === 'ip') {
      if (!req.body.ip) {
        res.status(400).json({ error: 'ip body param required' });
        return;
      }

      if (poll.ips && poll.ips.filter((x) => x === req.body.ip)) {
        res.status(403).json({});
        return;
      }
    }

    // Captcha check
    if (poll.draft.useCaptcha) {
      if (!req.body.token) {
        res.status(400).json({ error: 'token body param required' });
        return;
      }

      const isValid = await validateCaptcha(req.body.token);

      if (!isValid) {
        res.status(429).json({});
        return;
      }
    }

    await submitAnswer(poll, req.body.answers, req.body.ip);

    res.status(200).json({ submitted: true });
  } else {
    res.status(404).json({});
  }
};
