import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import VacancyContext from './context/vacancyContext';
import BoardPage from './pages/board';
import CreateVacancy from './pages/createVacancy';
import ListVacancy from './pages/listVacancy';
import VacancyView from './pages/vacancy-view';

const Vacancy = () => {
  const [vacancyID, setVacancyID] = useState(0)

  return (
    <VacancyContext.Provider value={{ vacancyID, setVacancyID }}>
      <Switch>
        <Route path="/vacancy/board" component={BoardPage} />
        <Route path="/vacancy/new" component={CreateVacancy} />
        <Route path="/vacancy/all" component={ListVacancy} />
        <Route path="/vacancy/edit" component={CreateVacancy} />
        <Route path="/vacancy/:id/view" component={VacancyView} />

        <Redirect from="/" to="/vacancy/board" />
      </Switch>
    </VacancyContext.Provider>
  );
};

export default Vacancy;
