import { Vacancy } from './Vacancy';

const List = ({ entities = [] }) => {
  if (entities.length === 0) {
    return <>Ops não foi encontrado nenhuma vaga</>;
  }

  return (
    <>
      {entities.map((entitie) => {
        return (
          <>
            <Vacancy entitie={entitie} />
          </>
        );
      })}
    </>
  );
};

export default List;
