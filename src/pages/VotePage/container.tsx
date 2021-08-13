import React from 'react';
import { Footer } from '../../common/containers/Footer';
import { Header } from '../../common/containers/Header';

import { MainContainer } from '../../common/containers/MainContainer';
import { PollVote } from '../../features/PollVote';
import classes from './container.module.css';

export const Container = () => {
  return (
    <div className={classes.wrapper}>
      <Header>Cool text</Header>
      <MainContainer>
        <PollVote />
      </MainContainer>
      <Footer>Cool text</Footer>
    </div>
  );
};
