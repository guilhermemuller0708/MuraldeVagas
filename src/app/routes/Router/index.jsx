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
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />

        {!isAuthorized ? <Redirect to="/login" /> : <BasePage />}

        <Route path="/profile" />
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
