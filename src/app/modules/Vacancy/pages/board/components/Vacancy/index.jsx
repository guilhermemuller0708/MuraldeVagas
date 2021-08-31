import {
  Favorite,
  FavoriteBorder as Desfavor,
  Business,
  Money
} from '@material-ui/icons';

import './index.scss';

const Vacancy = ({
  entitie,
  handleClickVacancy,
  handleClickFavorite,
  user
}) => {
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

  return (
    <>
      <div className="wrapper">
        <div className="content" onClick={() => handleClickVacancy(id)}>
          <span className="area">{areaDaVaga?.nomeArea}</span>
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
            {requisitos.map((requisito, index) => {
              return (
                <div className="requirement" key={index}>
                  {requisito}
                </div>
              );
            })}
          </div>
        </div>
        {!user?.perfis?.includes('ADMIN') ? (
          <div className="favorite">
            <span onClick={() => handleClickFavorite(id)}>
              {isFavorite ? <Favorite /> : <Desfavor />}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export { Vacancy };
