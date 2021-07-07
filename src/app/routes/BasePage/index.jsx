import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from 'app/components/Header';

const BasePage = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/profile" />
          <Route path="/board" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default BasePage;
