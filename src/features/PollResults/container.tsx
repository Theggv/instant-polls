import React from 'react';
import Link from 'next/link';

import { ChartBar } from '../../common/components/ChartBar';
import { PollContainer } from '../../common/containers/PollContainer';
import { ButtonInput } from '../../common/ui/input/ButtonInput';
import { StyledLabel } from '../../common/ui/label/StyledLabel';
import classes from './container.module.css';

type DuplicateCheckTypes = 'none' | 'ip' | 'cookies';

interface ResultsProps {
  draft?: {
    title?: string;
    options?: string[];
    multiple?: boolean;
    checkDuplicates?: DuplicateCheckTypes;
  };
  results?: number[];
}

export const PollResults: React.FC<ResultsProps> = ({
  draft = {
    title: 'Question?',
    options: ['Answer #1', 'Answer #2', 'Answer #3'],
    multiple: false,
  },
  results = [105, 304, 15],
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
        <Link href={`/`}>
          <ButtonInput className={classes.btn__vote} value='Vote' />
        </Link>
      </div>
    </PollContainer>
  );
};
