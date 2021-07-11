import api from 'app/services/api';

const BASE_URL_API = '/vacancy';

const find = (queryParams) => {
  return api.post(`${BASE_URL_API}/find`, queryParams);
};

export { find };
