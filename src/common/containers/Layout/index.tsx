import Link from 'next/link';
import React from 'react';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import classes from './Layout.module.css';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <Link href='/'>
          <h1 className={classes.header__title}>Instant polls</h1>
        </Link>
      </Header>
      <Main>{children}</Main>
      <Footer>Cool text</Footer>
    </>
  );
};

export default Layout;
