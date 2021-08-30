import api from 'app/services/api';

const BASE_URL_API = '/vagas';

const findAll = (queryParams) => {
  const {
    page = 1,
    perPage = 10,
    field = 'titulo',
    order = 'ASC',
    search = '',
    desirable,
    salary = 0,
    company
  } = queryParams;

  const pageNumber = page - 1;

  // const searchByTitle = !!search ? `&titulo=${search}&empresa=${search}&descricao=${search}` : '';
  const searchByTitle = !!search ? `&titulo=${search}` : '';

  const url = `${BASE_URL_API}/paginado?pagina=${pageNumber}&linhasPorPagina=${perPage}&salario=${salary}&ordem=${field}&salario=${salary}&desejavel=${desirable}&empresa=${company}&direcao=${order}${searchByTitle}`;

  return api.get(url);
};

const findById = (vacancyId) => {
  return api.get(`${BASE_URL_API}/${vacancyId}`);
};

const findAllVacancyFavorites = (userId) => {
  return api.get(`candidatos/${userId}/vagas/favoritas`);
};

const findAllWithoutRules = () => {
  return api.get(`${BASE_URL_API}`);
};

const deleteVacancy = (vacancyId) => {
  return api.delete(`${BASE_URL_API}/${vacancyId}`);
};

const findAreas = () => {
  return api.get(`/areas`);
};

const createVacancy = (vacancy) => {
  return api.post(`${BASE_URL_API}`, vacancy);
};

const editVacancy = (vacancyId, vacancy) => {
  return api.put(`${BASE_URL_API}/${vacancyId}`, vacancy);
};

const favoriteVacancyById = (userId, vacancyId) => {
  return api.post(`candidatos/${userId}/vagas/favoritar/${vacancyId}`);
};

const disfavorVacancyById = (userId, vacancyId) => {
  return api.delete(`candidatos/${userId}/vagas/desfavoritar/${vacancyId}`);
};

export {
  findAll,
  findById,
  findAllWithoutRules,
  deleteVacancy,
  findAreas,
  createVacancy,
  editVacancy,
  favoriteVacancyById,
  disfavorVacancyById,
  findAllVacancyFavorites
};
