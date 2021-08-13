import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { MainPage } from '../pages/MainPage';
import { ResultsPage } from '../pages/ResultsPage';
import { VotePage } from '../pages/VotePage';

function App() {
  return (
    <BrowserRouter>
      <Route path='/:id/r' component={ResultsPage} />
      <Route exact path='/:id' component={VotePage} />
      <Route exact path='/' component={MainPage} />
    </BrowserRouter>
  );
}

export default App;
