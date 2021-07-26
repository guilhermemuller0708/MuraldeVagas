import { shallowEqual, useSelector } from 'react-redux';

import Loader from 'app/components/Loader';
import { Vacancy } from '../Vacancy';

import './index.scss';

const List = ({ entities = [] }) => {
  const { isLoading } = useSelector(
    ({ board }) => ({
      isLoading: board.listLoading
    }),
    shallowEqual
  );

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
            <Vacancy entitie={entitie} key={entitie.id} />
          </>
        );
      })}
    </>
  );
};

export default List;
