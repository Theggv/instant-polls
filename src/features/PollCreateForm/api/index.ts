import axios from 'axios';

import { PollDraft } from '../../../common/model/pollDraft';
import { CreatePollResponse } from '../../../pages/api/polls/create';

const BASE_PATH = '/polls';

export const createPoll = async (draft: PollDraft) => {
  const { data } = await axios.post<CreatePollResponse>(
    '/api/polls/create',
    draft
  );
  return data.id;
};

/**
 *
 *
 *
 */
