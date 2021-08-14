import type { NextPage } from 'next';

import { Footer } from '../common/containers/Footer';
import { Header } from '../common/containers/Header';
import { MainContainer } from '../common/containers/MainContainer';
import { PollCreateForm } from '../features/PollCreateForm';

const Home: NextPage = () => {
  return (
    <>
      <Header>Cool text</Header>
      <MainContainer>
        <PollCreateForm />
      </MainContainer>
      <Footer>Cool text</Footer>
    </>
  );
};

export default Home;
