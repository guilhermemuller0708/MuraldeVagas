import { Favorite, FavoriteBorder as Desfavorie } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Business, Money } from '@material-ui/icons';

import './index.scss';

const Vacancy = ({ entitie }) => {
  const history = useHistory();
  const {
    id,
    isFavorite = false,
    descricao,
    empresa,
    requisitos = [],
    salario,
    titulo,
    areaDaVaga
  } = entitie;

  const handleClickFavorite = (vacancyId) => {
    console.log('handleClickFavorite', vacancyId);
  };

  const handleClickVacancy = (vacancyId) => {
    history.push(`/vacancy/${vacancyId}/view`);
  };

  return (
    <>
      <div className="wrapper">
        <div className="content" onClick={() => handleClickVacancy(id)}>
          <span className="area">{areaDaVaga.nomeArea}</span>
          <h3 className="title">{titulo}</h3>
          <div className="business-money">
            <span>
              <Business /> {empresa}
            </span>
            <span>
              <Money /> {salario}
            </span>
          </div>
          <p>{descricao}</p>
          <div className="requirements">
            {requisitos.map((requisito) => {
              return (
                <div className="requirement" key={requisito}>
                  {requisito}
                </div>
              );
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
