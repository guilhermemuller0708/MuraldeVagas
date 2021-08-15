import { shallowEqual, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Logout from 'app/modules/Auth/pages/Logout';
import BasePage from '../BasePage';
import Login from 'app/modules/Auth/pages/Login';
import SignUp from 'app/modules/Auth/pages/SignUp';

const Router = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user !== undefined
    }),
    shallowEqual
  );

  if (!isAuthorized) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />

          <Redirect from="*" to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <BasePage />
        <Redirect to="/board" />

        <Route path="/profile" />
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
