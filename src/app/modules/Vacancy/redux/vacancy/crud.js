import api from 'app/services/api';

const BASE_URL_API = '/vagas';

const findAll = (queryParams) => {
  const { page = 0, perPage = 0, field = 'area', order = 'ASC' } = queryParams;

  return api.get(
    `${BASE_URL_API}paginado?linhasPorPagina=${perPage}&pagina=${page}&ordem=${field}&direcao=${order}`
  );
};

export { findAll };
