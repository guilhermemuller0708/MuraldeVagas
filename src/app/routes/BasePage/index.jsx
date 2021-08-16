import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from 'app/components/Header';
import Vacancy from 'app/modules/Vacancy';

import { actions } from 'app/modules/Auth/redux/slice';

const BasePage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    ({ auth }) => ({ user: auth.user }),
    shallowEqual
  );

  useEffect(() => {
    if (!user?.tipo) {
      const promise = dispatch(actions.getUserById({ userId: user.id }));

      return () => {
        promise.abort();
      };
    }
  }, [user, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
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
