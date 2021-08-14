import Link from 'next/link';
import React from 'react';

import { ChartBar } from '../../common/components/ChartBar';
import { PollContainer } from '../../common/containers/PollContainer';
import { PollDraft } from '../../common/model/pollDraft';
import { ButtonInput } from '../../common/ui/input/ButtonInput';
import { StyledLabel } from '../../common/ui/label/StyledLabel';
import classes from './PollResults.module.css';

export interface PollResultsProps {
  id: string;
  draft: PollDraft;
  results: number[];
}

export const PollResults: React.FC<PollResultsProps> = ({
  id,
  draft,
  results,
}) => {
  const totalVotes = results.reduce((a, b) => a + b);

  const getPercent = (votesCount: number) => {
    if (!totalVotes) return 0;
    return (votesCount / totalVotes) * 100;
  };

  const Result = ({ option, index }: { option: string; index: number }) => {
    const percent = getPercent(results[index]);

    return (
      <div className={classes.results__item}>
        <div className={classes.results__item__name}>{option}</div>
        <div className={classes.results__item__votes}>
          {results[index]} votes
        </div>
        <div className={classes.results__item__bar}>
          <ChartBar percent={getPercent(results[index])} />
        </div>
        <div
          className={classes.results__item__percent}
        >{`${percent.toFixed()}%`}</div>
      </div>
    );
  };

  return (
    <PollContainer>
      <StyledLabel className={classes.title}>{draft.title}</StyledLabel>

      <div className={classes.results}>
        {draft.options!.map((option, index) => (
          <Result option={option} key={index} index={index} />
        ))}
      </div>

      <div className={classes.footer}>
        <div className={classes.footer__total__votes}>{totalVotes} votes</div>
        <Link href={`/polls/${id}`}>
          <ButtonInput className={classes.btn__vote} value='Vote' />
        </Link>
      </div>
    </PollContainer>
  );
};
