import React from 'react';

import { PollCreateForm } from '../../features/PollCreateForm';
import { PollVote } from '../../features/PollVote';

export const MainPage = () => {
  return (
    <div>
      <PollCreateForm />
      <PollVote />
      {/* <PollResults /> */}
    </div>
  );
};
