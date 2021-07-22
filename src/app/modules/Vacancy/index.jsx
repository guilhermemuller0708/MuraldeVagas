import { Redirect, Route, Switch } from 'react-router-dom';

import BoardPage from './pages/board';

const Vacancy = () => {
  return (
    <Switch>
      <Route path="/vacancy/board" component={BoardPage} />

      <Redirect from="/" to="/vacancy/board" />
    </Switch>
  );
};

export default Vacancy;
