import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { MainPage } from '../pages/MainPage';
import { ResultsPage } from '../pages/ResultsPage';
import { VotePage } from '../pages/VotePage';

function App() {
  return (
    <HashRouter basename='/'>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/:id' component={VotePage} />
      <Route exact path='/:id/r' component={ResultsPage} />
    </HashRouter>
  );
}

export default App;
