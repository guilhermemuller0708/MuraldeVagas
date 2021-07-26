import { Redirect, Route, Switch } from 'react-router-dom';

import BoardPage from './pages/board';
import VacancyView from './pages/vacancy-view';

const Vacancy = () => {
  return (
    <Switch>
      <Route path="/vacancy/board" component={BoardPage} />
      <Route path="/vacancy/:id/view" component={VacancyView} />

      <Redirect from="/" to="/vacancy/board" />
    </Switch>
  );
};

export default Vacancy;
