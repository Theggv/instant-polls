import React from 'react';

import { Footer } from '../../common/containers/Footer';
import { Header } from '../../common/containers/Header';
import { MainContainer } from '../../common/containers/MainContainer';
import { PollResults } from '../../features/PollResults';
import classes from './container.module.css';

export const Container = () => {
  return (
    <div className={classes.wrapper}>
      <Header>Cool text</Header>
      <MainContainer>
        <PollResults />
      </MainContainer>
      <Footer>Cool text</Footer>
    </div>
  );
};
