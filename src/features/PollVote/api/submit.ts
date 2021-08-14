import axios from 'axios';
import { SubmitAnswerResponse } from '../../../pages/api/polls/submit';

export const submitAnswer = async (id: string, answers: boolean[]) => {
  const { data } = await axios.post<SubmitAnswerResponse>('/api/polls/submit', {
    id,
    answers,
  });

  if (!data) return undefined;

  return data;
};
