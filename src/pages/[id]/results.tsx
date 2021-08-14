import type { NextPage } from 'next';

import { Footer } from '../../common/containers/Footer';
import { Header } from '../../common/containers/Header';
import { MainContainer } from '../../common/containers/MainContainer';
import { PollResults } from '../../features/PollResults';

const Results: NextPage = () => {
  return (
    <>
      <Header>Cool text</Header>
      <MainContainer>
        <PollResults />
      </MainContainer>
      <Footer>Cool text</Footer>
    </>
  );
};

export default Results;
