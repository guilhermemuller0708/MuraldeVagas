import { Favorite, FavoriteBorder as Desfavorie } from '@material-ui/icons';

import './index.scss';

const Vacancy = ({ entitie }) => {
  const {
    id,
    isFavorite = false,
    descricao,
    empresa,
    requisitos = [],
    salario,
    titulo,
    areaDaVaga: { nomeArea }
  } = entitie;

  const handleClickFavorite = (vacancyId) => {
    console.log('handleClickFavorite', vacancyId);
  };

  const handleClickVacancy = (vacancyId) => {
    console.log('handleClickVacancy', vacancyId);
  };

  return (
    <>
      <div className="wrapper">
        <div className="content" onClick={() => handleClickVacancy(id)}>
          <span className="area">{nomeArea}</span>
          <h3 className="title">{titulo}</h3>
          <span>
            {empresa} - R$ {salario}
          </span>
          <p>{descricao}</p>
          <div className="requirements">
            {requisitos.map((requisito) => {
              return <div className="requirement">{requisito}</div>;
            })}
          </div>
        </div>
        <div className="favorite">
          <span onClick={() => handleClickFavorite(id)}>
            {isFavorite ? <Favorite /> : <Desfavorie />}
          </span>
        </div>
      </div>
    </>
  );
};

export { Vacancy };
