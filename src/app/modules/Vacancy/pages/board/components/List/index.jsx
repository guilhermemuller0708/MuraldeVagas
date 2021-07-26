import { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Loader from 'app/components/Loader';
import { Vacancy } from '../Vacancy';

import './index.scss';

const List = ({ entities = [] }) => {
  const history = useHistory();
  const { isLoading } = useSelector(
    ({ board }) => ({
      isLoading: board.listLoading
    }),
    shallowEqual
  );

  const handleClickFavorite = (vacancyId) => {
    console.log('handleClickFavorite', vacancyId);
  };

  const handleClickVacancy = (vacancyId) => {
    history.push(`/vacancy/${vacancyId}/view`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && entities.length === 0) {
    return (
      <>
        <div className="empty-list">
          <div>Ops, não foi encontrado nenhuma vaga :(</div>
        </div>
      </>
    );
  }

  return (
    <>
      {entities.map((entitie) => {
        return (
          <>
            <Vacancy
              entitie={entitie}
              key={entitie.id}
              handleClickVacancy={handleClickVacancy}
              handleClickFavorite={handleClickFavorite}
            />
          </>
        );
      })}
    </>
  );
};

export default memo(List);
