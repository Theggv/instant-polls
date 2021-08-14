import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { Footer } from '../common/containers/Footer';
import { Header } from '../common/containers/Header';
import { MainContainer } from '../common/containers/MainContainer';
import { PollVote } from '../features/PollVote';

const Vote: NextPage = () => {
  return (
    <>
      <Header>Cool text</Header>
      <MainContainer>
        <PollVote />
      </MainContainer>
      <Footer>Cool text</Footer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id as string,
    },
  };
};

export default Vote;
