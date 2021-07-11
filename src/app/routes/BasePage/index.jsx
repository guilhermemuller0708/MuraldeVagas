import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from 'app/components/Header';
import Vacancy from 'app/modules/Vacancy';

const BasePage = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/profile" />
          <Route path="/board" component={Vacancy} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default BasePage;
