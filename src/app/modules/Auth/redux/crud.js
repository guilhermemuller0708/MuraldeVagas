import api from 'app/services/api';

const BASE_URL_API = '/login';

const login = (user) => {
  return api.post(BASE_URL_API, user);
};

const userByToken = (token) => {
  return api.get(BASE_URL_API);
};

export { login, userByToken };
