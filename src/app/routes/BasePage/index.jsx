import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from 'app/components/Header';
import Vacancy from 'app/modules/Vacancy';

const BasePage = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/profile" />
          <Route path="/vacancy" component={Vacancy} />

          <Redirect from="/" to="/vacancy" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default BasePage;
