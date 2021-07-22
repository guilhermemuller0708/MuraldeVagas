import { Vacancy } from '../Vacancy';

const List = ({ entities = [] }) => {
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
