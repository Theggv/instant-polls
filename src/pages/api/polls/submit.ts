import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../common/model/firebase';
import { getResults } from './results';

const BASE_PATH = '/polls';

export type SubmitAnswerResponse = {
  canSubmit: boolean;
};

export const submitAnswer = async (id: string, answers: boolean[]) => {
  return await db
    .ref(`${BASE_PATH}/${id}`)
    .get()
    .then(async (snapshot) => {
      if (!snapshot.exists()) return false;

      const data = await getResults(id);
      if (!data) return false;

      let { results } = data;
      results = results.map((val, i) => val + Number(answers[i]));

      await snapshot.ref.update({ results });

      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SubmitAnswerResponse>
) => {
  const canSubmit = await submitAnswer(req.body.id, req.body.answers);

  res.status(200).json({ canSubmit });
};
