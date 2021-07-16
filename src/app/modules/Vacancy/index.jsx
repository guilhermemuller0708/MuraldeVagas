import { Route, Switch } from 'react-router-dom';
import VacancyPage from './pages/vacancy';

const Vacancy = () => {
  return (
    <Switch>
      <Route path="/" component={VacancyPage} />
    </Switch>
  );
};

export default Vacancy;
