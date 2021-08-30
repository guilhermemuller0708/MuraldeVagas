import { memo } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Loader from 'app/components/Loader';
import { Vacancy } from '../Vacancy';

import { actions } from '../../../../redux/board/slice';

import './index.scss';
import { unwrapResult } from '@reduxjs/toolkit';

const List = ({ entities = [] }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading } = useSelector(
    ({ board }) => ({
      isLoading: board.listLoading
    }),
    shallowEqual
  );

  const handleClickFavorite = (vacancyId) => {
    const vacancy = entities.find(
      (entitie) => parseInt(entitie.id) === parseInt(vacancyId)
    );

    if (vacancy?.isFavorite) {
      dispatch(actions.disfavorVacancy(vacancyId))
        .then(unwrapResult)
        .then(() => {
          toast.success('Vaga desfavoritada com sucesso', {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(actions.fetchVacancysFavorites());
        })
        .catch(() => {
          toast.error('Opss..., Erro ao desfavoritar vaga', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    } else {
      dispatch(actions.favoriteVacancy(vacancyId))
        .then(unwrapResult)
        .then(() => {
          toast.success('Vaga favoritada com sucesso', {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(actions.fetchVacancysFavorites());
        })
        .catch(() => {
          toast.error('Opss..., Erro ao favoritar vaga', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    }
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
