import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

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

  return (
    <BrowserRouter>
      <Switch>
        {!isAuthorized ? (
          <Route component={Login} />
        ) : (
          <Redirect from="/auth" to="/" />
        )}

        <Route path="/profile" />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={SignUp} />

        {!isAuthorized ? <Redirect to="/auth/login" /> : <BasePage />}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
